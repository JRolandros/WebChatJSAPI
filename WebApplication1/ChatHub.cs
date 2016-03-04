using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace WebApplication1
{
    public class chatHub : Hub
    {
        static  List<string> users = new List<string>(); 
        public void NewTextMessage(string userid,string message)
        {
            Clients.All.newTextMessage(userid, message);
            //users.Add(userid);
        }
    }
}