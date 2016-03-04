/// <reference path="jquery/jquery.d.ts" />
/// <reference path="knockout/knockout.d.ts" />
/// <reference path="signalr/signalr.d.ts" />
/// <reference path="neon.d.ts" />
/// <reference path="../collections.ts" />



class ChatModel {
    groupid: string;
    hub: HubProxy;
    users: collections.Dictionary<string, Customer>;
    constructor(h: HubProxy) {
        this.hub = h;
        this.groupid = neonChat.createGroup("Test", true);
        this.users =new collections.Dictionary<string, Customer>();
        neonChat.onsendMessage =(id, msg, dt) => {
            alert(id + " : " + msg);
        };
        this.hub.client.newTextMessage = (userid, message) => {
            if (this.users.containsKey(userid)) {
                var ids = this.users.getValue(userid).id;
                neonChat.pushMessage(ids, message, userid,new Date(),true,true);
            } else {
                var id = neonChat.addUser(this.groupid, userid, "online", true);
                this.users.setValue(userid, new Customer(userid, userid, id));
                neonChat.pushMessage(id, message, userid, new Date(), true, true);
            }
        }


        ko.applyBindings(this);
        
        
    }
}

interface SignalR {
    chatHub: HubProxy;
}

interface IWebChatHubClient {
    newTextMessage(userid : string, message : string);
}

interface IWebChatHubServer{}

interface HubProxy {
    client: IWebChatHubClient;
    server: IWebChatHubServer;
}

class Customer {
    constructor(public firstName: string, public lastName: string, public id: string) {
    }
   
}

