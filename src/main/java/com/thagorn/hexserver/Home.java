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
    private static final String BASE_PAGE =
            "" +
                    "<html>" +
                    "  <head>" +
                    "  </head>" +
                    "  <body>" +
                    "    <div>Hello World!</div>" +
                    "    <div id=\"like_button_container\"></div>" +
                    "    <script src=\"https://unpkg.com/react@16/umd/react.production.min.js\" crossorigin></script>" +
                    "    <script src=\"https://unpkg.com/react-dom@16/umd/react-dom.production.min.js\" crossorigin></script>" +
                    "    <script src=\"/static/js/processed/like_button.js\"></script>" +
                    "  </body>" +
                    "</html>";

    @GET
    @Path("test")
    @Produces(MediaType.TEXT_HTML)
    public String Index()
    {
        return BASE_PAGE;
    }
}
