//
//  BonjourService.swift
//  Boteillier
//
//  Created by Daniel Corn on 14.12.16.
//
//

import Foundation
import MultipeerConnectivity

struct BonjourService{
    public static func publish() {
        print("start publish")
        
//        let BM_DOMAIN = "local."
        let BM_DOMAIN = ""
        let BM_TYPE = "_btlr._tcp"
        //let BM_TYPE = "_http._tcp."
        
        let BM_NAME = "boteillier"
        let BM_PORT : CInt = 8181
        
        /// Netservice
        let nsns = NetService(domain: BM_DOMAIN,
                                type: BM_TYPE, name: BM_NAME, port: BM_PORT)
        let nsnsdel = BMNSDelegate() //see bellow
        nsns.delegate = nsnsdel
        nsns.publish()
        print("fin publish");
    }
}

class BMNSDelegate : NSObject, NetServiceDelegate {
    func netServiceWillPublish(_ sender: NetService) {
        print("netServiceWillPublish")
    }
    func netServiceDidPublish(_ sender: NetService) {
        print("netServiceDidPublish")
    }
    func netService(_ sender: NetService, didNotPublish errorDict: [String : NSNumber]) {
        print("netService didNotPublish")
    }
    func netServiceWillResolve(_ sender: NetService) {
        print("netServiceWillResolve")
    }
    func netServiceDidResolveAddress(_ sender: NetService) {
        print("netServiceDidResolveAddress")
    }
    func netService(_ sender: NetService, didNotResolve errorDict: [String : NSNumber]) {
        print("netService didNotResolve")
    }
    func netServiceDidStop(_ sender: NetService) {
        print("netServiceDidStop")
    }
    func netService(_ sender: NetService, didUpdateTXTRecord data: Data) {
        print("netService didUpdateTXTRecord")
    }
    func netService(_ sender: NetService, didAcceptConnectionWith inputStream: InputStream, outputStream: OutputStream) {
        print("netService didAcceptConnectionWith")
    }
    // .....and so on for the 8 other methods.....
}
