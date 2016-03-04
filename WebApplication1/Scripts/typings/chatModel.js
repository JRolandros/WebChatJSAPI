/// <reference path="jquery/jquery.d.ts" />
/// <reference path="knockout/knockout.d.ts" />
/// <reference path="signalr/signalr.d.ts" />
/// <reference path="neon.d.ts" />
/// <reference path="../collections.ts" />
var ChatModel = (function () {
    function ChatModel(h) {
        var _this = this;
        this.hub = h;
        this.groupid = neonChat.createGroup("Test", true);
        this.users = new collections.Dictionary();
        neonChat.onsendMessage = function (id, msg, dt) {
            alert(id + " : " + msg);
        };
        this.hub.client.newTextMessage = function (userid, message) {
            if (_this.users.containsKey(userid)) {
                var ids = _this.users.getValue(userid).id;
                neonChat.pushMessage(ids, message, userid, new Date(), true, true);
            }
            else {
                var id = neonChat.addUser(_this.groupid, userid, "online", true);
                _this.users.setValue(userid, new Customer(userid, userid, id));
                neonChat.pushMessage(id, message, userid, new Date(), true, true);
            }
        };
        ko.applyBindings(this);
    }
    return ChatModel;
})();
var Customer = (function () {
    function Customer(firstName, lastName, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }
    return Customer;
})();
