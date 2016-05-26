typed_spans = [
  [55,46,55,61,"Int"],
  [55,46,55,61,"InetServerOptions -> Int"],
  [55,46,55,61,"InetServerOptions"],
  [55,46,55,61,"Int"],
  [56,46,56,56,"PortNumber"],
  [56,46,56,56,"InetServerOptions -> PortNumber"],
  [56,46,56,56,"InetServerOptions"],
  [56,46,56,56,"PortNumber"],
  [57,46,57,55,"HostAddress"],
  [57,46,57,55,"InetServerOptions -> HostAddress"],
  [57,46,57,55,"InetServerOptions"],
  [57,46,57,55,"HostAddress"],
  [58,46,58,51,"Bool"],
  [58,46,58,51,"InetServerOptions -> Bool"],
  [58,46,58,51,"InetServerOptions"],
  [58,46,58,51,"Bool"],
  [59,46,59,52,"Family"],
  [59,46,59,52,"InetServerOptions -> Family"],
  [59,46,59,52,"InetServerOptions"],
  [59,46,59,52,"Family"],
  [60,46,60,54,"SocketType"],
  [60,46,60,54,"InetServerOptions -> SocketType"],
  [60,46,60,54,"InetServerOptions"],
  [60,46,60,54,"SocketType"],
  [61,46,61,54,"String"],
  [61,46,61,54,"InetServerOptions -> String"],
  [61,46,61,54,"InetServerOptions"],
  [61,46,61,54,"String"],
  [63,15,63,17,"Eq InetServerOptions"],
  [63,15,63,17,"(InetServerOptions -> InetServerOptions -> Bool) -> Eq InetServerOptions"],
  [63,15,63,17,"(InetServerOptions -> InetServerOptions -> Bool) -> (InetServerOptions -> InetServerOptions -> Bool) -> Eq InetServerOptions"],
  [63,15,63,17,"InetServerOptions -> InetServerOptions -> Bool"],
  [63,15,63,17,"InetServerOptions -> InetServerOptions -> Bool"],
  [63,19,63,23,"Show InetServerOptions"],
  [63,19,63,23,"([InetServerOptions] -> ShowS) -> Show InetServerOptions"],
  [63,19,63,23,"(InetServerOptions -> String) -> ([InetServerOptions] -> ShowS) -> Show InetServerOptions"],
  [63,19,63,23,"(Int -> InetServerOptions -> ShowS) -> (InetServerOptions -> String) -> ([InetServerOptions] -> ShowS) -> Show InetServerOptions"],
  [63,19,63,23,"Int -> InetServerOptions -> ShowS"],
  [63,19,63,23,"InetServerOptions -> String"],
  [63,19,63,23,"[InetServerOptions] -> ShowS"],
  [63,19,63,23,"InetServerOptions -> String"],
  [63,15,63,17,"InetServerOptions -> InetServerOptions -> Bool"],
  [63,15,63,17,"InetServerOptions -> InetServerOptions -> Bool"],
  [63,19,63,23,"Int -> InetServerOptions -> ShowS"],
  [63,19,63,23,"[InetServerOptions] -> ShowS"],
  [78,22,85,41,"InetServerOptions"],
  [78,59,78,60,"Int"],
  [78,1,85,41,"Int -> InetServerOptions"],
  [78,18,78,19,"Int"],
  [79,54,79,70,"PortNumber"],
  [79,55,79,69,"PortNumber"],
  [79,55,79,67,"Int -> PortNumber"],
  [79,68,79,69,"Int"],
  [80,53,80,63,"HostAddress"],
  [81,49,81,54,"Bool"],
  [82,50,82,57,"Family"],
  [83,52,83,58,"SocketType"],
  [84,52,84,57,"[Char]"],
  [87,35,87,44,"InetServerOptions"],
  [87,35,87,44,"SocketServer -> InetServerOptions"],
  [87,35,87,44,"SocketServer"],
  [87,35,87,44,"InetServerOptions"],
  [88,35,88,41,"Socket"],
  [88,35,88,41,"SocketServer -> Socket"],
  [88,35,88,41,"SocketServer"],
  [88,35,88,41,"Socket"],
  [89,29,89,31,"Eq SocketServer"],
  [89,29,89,31,"(SocketServer -> SocketServer -> Bool) -> Eq SocketServer"],
  [89,29,89,31,"(SocketServer -> SocketServer -> Bool) -> (SocketServer -> SocketServer -> Bool) -> Eq SocketServer"],
  [89,29,89,31,"SocketServer -> SocketServer -> Bool"],
  [89,29,89,31,"SocketServer -> SocketServer -> Bool"],
  [89,33,89,37,"Show SocketServer"],
  [89,33,89,37,"([SocketServer] -> ShowS) -> Show SocketServer"],
  [89,33,89,37,"(SocketServer -> String) -> ([SocketServer] -> ShowS) -> Show SocketServer"],
  [89,33,89,37,"(Int -> SocketServer -> ShowS) -> (SocketServer -> String) -> ([SocketServer] -> ShowS) -> Show SocketServer"],
  [89,33,89,37,"Int -> SocketServer -> ShowS"],
  [89,33,89,37,"SocketServer -> String"],
  [89,33,89,37,"[SocketServer] -> ShowS"],
  [89,33,89,37,"SocketServer -> String"],
  [89,29,89,31,"SocketServer -> SocketServer -> Bool"],
  [89,29,89,31,"SocketServer -> SocketServer -> Bool"],
  [89,33,89,37,"Int -> SocketServer -> ShowS"],
  [89,33,89,37,"[SocketServer] -> ShowS"],
  [94,1,106,21,"InetServerOptions -> IO SocketServer"],
  [94,19,94,23,"InetServerOptions"],
  [95,5,103,60,"IO SocketServer"],
  [95,17,95,50,"IO ProtocolNumber"],
  [95,17,95,34,"ProtocolName -> IO ProtocolNumber"],
  [95,35,95,50,"String"],
  [95,36,95,49,"String"],
  [95,36,95,44,"InetServerOptions -> String"],
  [95,45,95,49,"InetServerOptions"],
  [95,8,95,13,"ProtocolNumber"],
  [96,13,96,55,"IO Socket"],
  [96,13,96,49,"ProtocolNumber -> IO Socket"],
  [96,13,96,33,"SocketType -> ProtocolNumber -> IO Socket"],
  [96,13,96,19,"Family -> SocketType -> ProtocolNumber -> IO Socket"],
  [96,20,96,33,"Family"],
  [96,21,96,32,"Family"],
  [96,21,96,27,"InetServerOptions -> Family"],
  [96,28,96,32,"InetServerOptions"],
  [96,34,96,49,"SocketType"],
  [96,35,96,48,"SocketType"],
  [96,35,96,43,"InetServerOptions -> SocketType"],
  [96,44,96,48,"InetServerOptions"],
  [96,50,96,55,"ProtocolNumber"],
  [96,8,96,9,"Socket"],
  [97,8,99,48,"IO ()"],
  [97,8,97,35,"Int -> IO ()"],
  [97,8,97,25,"SocketOption -> Int -> IO ()"],
  [97,8,97,23,"Socket -> SocketOption -> Int -> IO ()"],
  [97,24,97,25,"Socket"],
  [97,26,97,35,"SocketOption"],
  [97,36,99,48,"Int"],
  [97,37,99,47,"Int"],
  [97,42,97,54,"Bool"],
  [97,43,97,53,"Bool"],
  [97,43,97,48,"InetServerOptions -> Bool"],
  [97,49,97,53,"InetServerOptions"],
  [98,45,98,46,"Int"],
  [98,37,98,41,"Bool"],
  [99,46,99,47,"Int"],
  [99,37,99,42,"Bool"],
  [100,8,101,39,"IO ()"],
  [100,8,100,20,"SockAddr -> IO ()"],
  [100,8,100,18,"Socket -> SockAddr -> IO ()"],
  [100,19,100,20,"Socket"],
  [100,21,101,39,"SockAddr"],
  [100,22,101,38,"SockAddr"],
  [100,22,100,52,"HostAddress -> SockAddr"],
  [100,22,100,34,"PortNumber -> HostAddress -> SockAddr"],
  [100,35,100,52,"PortNumber"],
  [100,36,100,51,"PortNumber"],
  [100,36,100,46,"InetServerOptions -> PortNumber"],
  [100,47,100,51,"InetServerOptions"],
  [101,22,101,38,"HostAddress"],
  [101,23,101,37,"HostAddress"],
  [101,23,101,32,"InetServerOptions -> HostAddress"],
  [101,33,101,37,"InetServerOptions"],
  [102,8,102,39,"IO ()"],
  [102,8,102,16,"Int -> IO ()"],
  [102,8,102,14,"Socket -> Int -> IO ()"],
  [102,15,102,16,"Socket"],
  [102,17,102,39,"Int"],
  [102,18,102,38,"Int"],
  [102,18,102,33,"InetServerOptions -> Int"],
  [102,34,102,38,"InetServerOptions"],
  [103,8,103,60,"IO SocketServer"],
  [103,8,103,14,"SocketServer -> IO SocketServer"],
  [103,15,103,16,"(SocketServer -> IO SocketServer) -> SocketServer -> IO SocketServer"],
  [103,17,103,60,"SocketServer"],
  [103,43,103,47,"InetServerOptions"],
  [103,58,103,59,"Socket"],
  [108,1,111,67,"SocketServer -> IO ()"],
  [108,19,108,21,"SocketServer"],
  [109,5,109,23,"IO ()"],
  [109,5,109,11,"Socket -> IO ()"],
  [109,12,109,23,"Socket"],
  [109,13,109,22,"Socket"],
  [109,13,109,19,"SocketServer -> Socket"],
  [109,20,109,22,"SocketServer"],
  [113,1,119,68,"SocketServer -> HandlerT -> IO ()"],
  [113,11,113,13,"SocketServer"],
  [113,14,113,18,"HandlerT"],
  [114,5,117,48,"IO ()"],
  [114,16,114,30,"InetServerOptions"],
  [114,17,114,29,"InetServerOptions"],
  [114,17,114,26,"SocketServer -> InetServerOptions"],
  [114,27,114,29,"SocketServer"],
  [114,9,114,30,"InetServerOptions"],
  [115,15,117,48,"IO ()"],
  [115,23,115,41,"IO (Socket, SockAddr)"],
  [115,23,115,29,"Socket -> IO (Socket, SockAddr)"],
  [115,30,115,41,"Socket"],
  [115,31,115,40,"Socket"],
  [115,31,115,37,"SocketServer -> Socket"],
  [115,38,115,40,"SocketServer"],
  [115,18,115,19,"(Socket, SockAddr)"],
  [116,31,116,52,"IO SockAddr"],
  [116,31,116,44,"Socket -> IO SockAddr"],
  [116,45,116,52,"Socket"],
  [116,46,116,51,"Socket"],
  [116,46,116,49,"(Socket, SockAddr) -> Socket"],
  [116,50,116,51,"(Socket, SockAddr)"],
  [116,18,116,27,"SockAddr"],
  [117,18,117,48,"IO ()"],
  [117,18,117,38,"SockAddr -> IO ()"],
  [117,18,117,30,"SockAddr -> SockAddr -> IO ()"],
  [117,18,117,22,"HandlerT"],
  [117,23,117,30,"Socket"],
  [117,24,117,29,"Socket"],
  [117,24,117,27,"(Socket, SockAddr) -> Socket"],
  [117,28,117,29,"(Socket, SockAddr)"],
  [117,31,117,38,"SockAddr"],
  [117,32,117,37,"SockAddr"],
  [117,32,117,35,"(Socket, SockAddr) -> SockAddr"],
  [117,36,117,37,"(Socket, SockAddr)"],
  [117,39,117,48,"SockAddr"],
  [121,1,132,4,"SocketServer -> HandlerT -> IO ()"],
  [121,14,121,16,"SocketServer"],
  [121,17,121,21,"HandlerT"],
  [122,5,122,43,"IO ()"],
  [122,5,122,14,"[IO ()] -> IO ()"],
  [122,15,122,43,"[IO ()]"],
  [122,16,122,42,"[IO ()]"],
  [122,16,122,22,"IO () -> [IO ()]"],
  [122,23,122,42,"IO ()"],
  [122,24,122,41,"IO ()"],
  [122,24,122,36,"HandlerT -> IO ()"],
  [122,24,122,33,"SocketServer -> HandlerT -> IO ()"],
  [122,34,122,36,"SocketServer"],
  [122,37,122,41,"HandlerT"],
  [136,1,149,63,"InetServerOptions -> HandlerT -> IO ()"],
  [136,17,136,24,"InetServerOptions"],
  [136,25,136,29,"HandlerT"],
  [137,5,138,34,"IO ()"],
  [137,20,137,45,"IO SocketServer"],
  [137,20,137,37,"InetServerOptions -> IO SocketServer"],
  [137,38,137,45,"InetServerOptions"],
  [137,8,137,16,"SocketServer"],
  [138,8,138,34,"IO ()"],
  [138,8,138,29,"HandlerT -> IO ()"],
  [138,8,138,20,"SocketServer -> HandlerT -> IO ()"],
  [138,21,138,29,"SocketServer"],
  [138,30,138,34,"HandlerT"],
  [155,1,167,34,"String -> Priority -> HandlerT -> Socket -> SockAddr -> SockAddr -> IO ()"],
  [155,16,155,21,"String"],
  [155,22,155,26,"Priority"],
  [155,27,155,32,"HandlerT"],
  [155,33,155,39,"Socket"],
  [155,40,155,50,"SockAddr"],
  [155,51,155,61,"SockAddr"],
  [156,5,163,65,"IO ()"],
  [156,19,156,42,"IO String"],
  [156,19,156,31,"SockAddr -> IO String"],
  [156,32,156,42,"SockAddr"],
  [156,8,156,15,"String"],
  [157,8,158,60,"IO ()"],
  [157,8,157,41,"String -> IO ()"],
  [157,8,157,36,"Priority -> String -> IO ()"],
  [157,8,157,30,"String -> Priority -> String -> IO ()"],
  [157,31,157,36,"String"],
  [157,37,157,41,"Priority"],
  [158,20,158,60,"[Char]"],
  [158,21,158,59,"[Char]"],
  [158,21,158,48,"[Char]"],
  [158,49,158,51,"[Char] -> [Char] -> [Char]"],
  [158,52,158,59,"String"],
  [159,8,161,63,"IO ()"],
  [159,8,160,44,"IO () -> IO ()"],
  [159,8,160,41,"String -> IO () -> IO ()"],
  [159,8,159,43,"Priority -> String -> IO () -> IO ()"],
  [159,8,159,37,"String -> Priority -> String -> IO () -> IO ()"],
  [159,38,159,43,"String"],
  [160,16,160,41,"Priority"],
  [160,42,160,44,"[Char]"],
  [160,45,161,63,"IO ()"],
  [160,46,161,62,"IO ()"],
  [160,46,160,69,"SockAddr -> IO ()"],
  [160,46,160,58,"SockAddr -> SockAddr -> IO ()"],
  [160,46,160,51,"HandlerT"],
  [160,52,160,58,"Socket"],
  [160,59,160,69,"SockAddr"],
  [161,52,161,62,"SockAddr"],
  [162,8,163,65,"IO ()"],
  [162,8,162,41,"String -> IO ()"],
  [162,8,162,36,"Priority -> String -> IO ()"],
  [162,8,162,30,"String -> Priority -> String -> IO ()"],
  [162,31,162,36,"String"],
  [162,37,162,41,"Priority"],
  [163,20,163,65,"[Char]"],
  [163,21,163,64,"[Char]"],
  [163,21,163,34,"[Char]"],
  [163,35,163,37,"[Char] -> [Char] -> [Char]"],
  [163,38,163,64,"[Char]"],
  [163,38,163,45,"String"],
  [163,46,163,48,"[Char] -> [Char] -> [Char]"],
  [163,49,163,64,"[Char]"],
  [170,1,182,3,"HandlerT -> Socket -> SockAddr -> SockAddr -> IO ()"],
  [170,17,170,22,"HandlerT"],
  [170,23,170,29,"Socket"],
  [170,30,170,40,"SockAddr"],
  [170,41,170,51,"SockAddr"],
  [171,5,172,17,"IO ()"],
  [171,8,171,51,"IO ThreadId"],
  [171,8,171,14,"IO () -> IO ThreadId"],
  [171,15,171,51,"IO ()"],
  [171,16,171,50,"IO ()"],
  [171,16,171,39,"SockAddr -> IO ()"],
  [171,16,171,28,"SockAddr -> SockAddr -> IO ()"],
  [171,16,171,21,"HandlerT"],
  [171,22,171,28,"Socket"],
  [171,29,171,39,"SockAddr"],
  [171,40,171,50,"SockAddr"],
  [172,8,172,17,"IO ()"],
  [172,8,172,14,"() -> IO ()"],
  [172,15,172,17,"()"],
  [185,1,189,16,"(Handle -> SockAddr -> SockAddr -> IO ()) -> Socket -> SockAddr -> SockAddr -> IO ()"],
  [185,15,185,19,"Handle -> SockAddr -> SockAddr -> IO ()"],
  [185,20,185,26,"Socket"],
  [185,27,185,37,"SockAddr"],
  [185,38,185,48,"SockAddr"],
  [186,5,189,16,"IO ()"],
  [186,13,186,48,"IO Handle"],
  [186,13,186,34,"IOMode -> IO Handle"],
  [186,13,186,27,"Socket -> IOMode -> IO Handle"],
  [186,28,186,34,"Socket"],
  [186,35,186,48,"IOMode"],
  [186,8,186,9,"Handle"],
  [187,8,187,37,"IO ()"],
  [187,8,187,23,"BufferMode -> IO ()"],
  [187,8,187,21,"Handle -> BufferMode -> IO ()"],
  [187,22,187,23,"Handle"],
  [187,24,187,37,"BufferMode"],
  [188,8,188,36,"IO ()"],
  [188,8,188,25,"SockAddr -> IO ()"],
  [188,8,188,14,"SockAddr -> SockAddr -> IO ()"],
  [188,8,188,12,"Handle -> SockAddr -> SockAddr -> IO ()"],
  [188,13,188,14,"Handle"],
  [188,15,188,25,"SockAddr"],
  [188,26,188,36,"SockAddr"],
  [189,8,189,16,"IO ()"],
  [189,8,189,14,"Handle -> IO ()"],
  [189,15,189,16,"Handle"]
  ];
