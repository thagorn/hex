var socket = io.connect('http://' + document.domain + ':' + location.port + "/chatsocket");

$("#button").on("click", function() {
    submit();
});

submit = function() {
    socket.emit("chat", $("#text").val());
    $("#text").val("");
}

$("#text").on("keyup", function(event) {
    if (event.keyCode === 13) {
        submit();
        return false;
    }
});

socket.on("chat", function(msg) {
    var row = $("<li>", {"class": "chat_row"});
    row[0].innerHTML = msg["text"];
    $("#output").append(row);
});
