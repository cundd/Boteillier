//
//  ServerBootstrap.swift
//  Boteillier
//
//  Created by Daniel Corn on 21.10.16.
//
//

//
//  arguments.swift
//  PerfectTemplate
//
//  Created by Kyle Jessup on 2016-07-12.
//	Copyright (C) 2016 PerfectlySoft, Inc.
//
//===----------------------------------------------------------------------===//
//
// This source file is part of the Perfect.org open source project
//
// Copyright (c) 2015 - 2016 PerfectlySoft Inc. and the Perfect project authors
// Licensed under Apache License v2.0
//
// See http://perfect.org/licensing.html for license information
//
//===----------------------------------------------------------------------===//
//

import PerfectLib
import PerfectHTTP
import PerfectHTTPServer
import PerfectThread
import Foundation

typealias ReceivedCommandCallback = (String, Bool) -> Void

#if os(Linux)
    import SwiftGlibc
#else
    import Darwin
#endif

struct ServerBootstrap {
    // Check all command line arguments used to configure the server.
    // These are all optional and you can remove or add arguments as required.
    static private func configureServer(_ server: HTTPServer) {
        
        var sslCert: String?
        var sslKey: String?
        
        var args = CommandLine.arguments
        
        func argFirst() -> String {
            guard let frst = args.first else {
                print("Argument requires value.")
                exit(-1)
            }
            return frst
        }
        
        let validArgs = [
            "--sslcert": {
                args.removeFirst()
                sslCert = argFirst()
            },
            "--sslkey": {
                args.removeFirst()
                sslKey = argFirst()
            },
            "--port": {
                args.removeFirst()
                server.serverPort = UInt16(argFirst()) ?? 8181
            },
            "--address": {
                args.removeFirst()
                server.serverAddress = argFirst()
            },
            "--root": {
                args.removeFirst()
                server.documentRoot = argFirst()
            },
            "--name": {
                args.removeFirst()
                server.serverName = argFirst()
            },
            "--runas": {
                args.removeFirst()
                server.runAsUser = argFirst()
            },
            "--help": {
                print("Usage: \(CommandLine.arguments.first!) [--port listen_port] [--address listen_address] [--name server_name] [--root root_path] [--sslcert cert_path --sslkey key_path] [--runas user_name]")
                exit(0)
            }]
        
        while args.count > 0 {
            if let closure = validArgs[args.first!.lowercased()] {
                closure()
            }
            args.removeFirst()
        }
        
        if sslCert != nil || sslKey != nil {
            if sslCert == nil || sslKey == nil {
                print("Error: if either --sslcert or --sslkey is provided then both --sslcert and --sslkey must be provided.")
                exit(-1)
            }
            if !File(sslCert!).exists || !File(sslKey!).exists {
                print("Error: --sslcert or --sslkey file did not exist.")
                exit(-1)
            }
            server.ssl = (sslCert: sslCert!, sslKey: sslKey!)
        }
    }
    
    public static func create(
        withDocumentRoot documentRoot: String,
        onPort port:UInt16 = 8181,
        receivedCommandCallback: @escaping ReceivedCommandCallback
        ) -> HTTPServer {
        
        let server = HTTPServer()
        server.serverPort = port
        self.configureRoutes(server, receivedCommandCallback:receivedCommandCallback)
        
        
        // Set a document root.
        // This is optional. If you do not want to serve static content then do not set this.
        // Setting the document root will automatically add a static file handler for the route /**
        server.documentRoot = documentRoot
        
        configureServer(server)
        
        return server
    }
    
    public static func startServer(_ server: HTTPServer) {
        do {
            // Launch the HTTP server.
            try server.start()
            
        } catch PerfectError.networkError(let err, let msg) {
            print("Network error thrown: \(err) \(msg)")
        } catch {
            print("Bad things happened")
        }
    }
    
    public static func startServerOnNewThread(_ server: HTTPServer) {
        let queue = Threading.getQueue(name: "server", type: Threading.QueueType.concurrent)
        
        queue.dispatch {
            self.startServer(server)
        }
    }
    
    private static func getFirstAddress() -> String {
        let addresses = NetworkService.getIpAddresses()
        
        return addresses.first!
        
    }
    
    private static func configureRoutes(_ server: HTTPServer, receivedCommandCallback: @escaping ReceivedCommandCallback) {
        // Register your own routes and handlers
        var routes = Routes()
        
        // Index route:
        routes.add(method: .options, uri: "/") {
            request, response in
            setCorsHeaders(response)
            response.completed()
        }
        routes.add(method: .get, uri: "/") {
            request, response in
            setCorsHeaders(response)
            response.status = .seeOther
            response.setHeader(.location, value: "/index.html")
            response.completed()
        }
        
        // Retrieve service information:
        routes.add(method: .options, uri: "/info") {
            request, response in
            setCorsHeaders(response)
            response.completed()
        }
        routes.add(method: .get, uri: "/info") {
            request, response in
            
            let data: [String:Any] = [
                "hostName": Host.current().localizedName ?? "",
                "ip": self.getFirstAddress()
            ]
            
            response.addHeader(HTTPResponseHeader.Name.accessControlAllowOrigin, value: "*")
            do {
                try response.setBody(json: data)
            } catch {
                print("Error: Could not set JSON response body: \(error)")
            }
            
            response.completed()
        }
        
        // Receive keys:
        routes.add(method: .get, uri: "/api/{key}") {
            request, response in
            setCorsHeaders(response)
            response.completed()
        }
        routes.add(method: .get, uri: "/api/{key}") {
            request, response in
            let key = request.urlVariables["key"]!
            
            setCorsHeaders(response)
            response.setHeader(.contentType, value: "application/json")
            let sent = KeySender.send(key: key)
            if !sent {
                print("Error: Could not send key")
            }
            
            let data: [String:Any] = [
                "key": key,
                "sent": sent
            ]
            
            receivedCommandCallback(key, sent)
            do {
                try response.setBody(json: data)
            } catch {
                print("Error: Could not set JSON response body: \(error)")
            }
            
            response.completed()
        }
        
        // Add the routes to the server.
        server.addRoutes(routes)
    }
    
    private static func setCorsHeaders(_ response: HTTPResponse, allowedMethods: String = "GET") {
        response.addHeader(HTTPResponseHeader.Name.allow, value: allowedMethods)
        response.addHeader(HTTPResponseHeader.Name.accessControlAllowOrigin, value: "*")
        response.addHeader(HTTPResponseHeader.Name.custom(name: "Access-Control-Allow-Headers"), value: "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    }
}
