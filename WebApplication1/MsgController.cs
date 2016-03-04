using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.SignalR;

namespace WebApplication1
{
    
    public class MsgController : ApiController
    {
        private static IHubContext Wchat => GlobalHost.ConnectionManager.GetHubContext<chatHub>();
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            Wchat.Clients.All.newTextMessage("doni", "test");
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post(string userid,string message)
        {
            Wchat.Clients.All.newTextMessage(userid, message);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}