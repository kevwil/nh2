# nh2 – http/2 proxy

__NH2__ is an http/2 proxy and TLS terminator. I created this to replace stud/stunnel/pound/etc. and offer http/2 in hopes of having a performance benefit over standard HTTP/1.1 + TLS.

__*The backend target server will be called using http (unencrypted).*__

SPDY style server push will be an option, sometime later.

## Options

 * __*-p*__ port this proxy should listen on. Default value is 443.
 * __*-k*__ TLS key
 * __*-c*__ TLS certificate, as a .crt file or as a .pem file
 * __*-h*__ backend host to send traffic to. Can be host name, like `localhost` or IP address like `127.0.0.1`. If the default http port (80) is not used, specify the host with the port; i.e. `localhost:8080`.

###### License

The MIT License

Copyright 2015 Kevin D. Williams
