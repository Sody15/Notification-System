// Toastr config
window.toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "0",
  "hideDuration": "0",
  "timeOut": "0",
  "extendedTimeOut": "0",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// Stomp/Websocket config
var stompClient = null;

function connectWebSocket() {
    var socket = new SockJS('/notifications-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/notifications', function (notification) {
            notification = JSON.parse(notification.body);
            showNotification(notification.message, notification.type);
        });
    });
}

function sendNotification() {
    stompClient.send("/app/notifications", {}, JSON.stringify({
        'message': $("#message").val(), 
        'type': $("input[name='notif-type']:checked").val()
        })
    );
}

function showNotification(message, type) {
    window.toastr[type](message);
}

$(function () {
    connectWebSocket();
    $("form").on('submit', function (e) {  e.preventDefault(); });
    $( "#send" ).click(function() { sendNotification(); });
});

