package com.thagorn.hexserver;

import org.eclipse.jetty.servlet.DefaultServlet;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.servlet.ServletContainer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class Application {

    public static void main (String[] args) throws Exception
    {

        Server server = new Server(8080);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        server.setHandler(context);

        // Static content
        ServletHolder resourceHolder = new ServletHolder("resources", DefaultServlet.class);
        resourceHolder.setInitParameter("resourceBase", "./static/");
        resourceHolder.setInitParameter("dirAllowed","true");
        resourceHolder.setInitParameter("pathInfoOnly","true");
        context.addServlet(resourceHolder, "/static/*");

        // Jersey content
        ServletHolder sh = new ServletHolder(ServletContainer.class);
        sh.setInitParameter(ServerProperties.PROVIDER_PACKAGES, "com.thagorn.hexserver");
        context.addServlet(sh, "/*");

        server.start();
        server.join();
    }
}