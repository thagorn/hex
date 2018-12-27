package com.thagorn.hexserver;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author awhitworth
 * @since 12/26/18.
 */
@Path("/")
public class Home
{
    @GET
    @Path("test")
    @Produces(MediaType.APPLICATION_JSON)
    public String Index()
    {
        return "Hello World!";
    }
}
