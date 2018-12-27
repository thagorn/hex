java -jar build/libs/hexserver-1.0.war > server/server.out 2> server/server.err &
echo "kill $! && echo > server/kill_server.sh" > server/kill_server.sh
