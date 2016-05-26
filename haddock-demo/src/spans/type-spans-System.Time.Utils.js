typed_spans = [
  [39,9,42,68,"CalendarTime"],
  [39,33,39,37,"Int"],
  [39,49,39,56,"Month"],
  [39,1,42,68,"CalendarTime"],
  [40,32,40,33,"Int"],
  [40,44,40,45,"Int"],
  [40,55,40,56,"Int"],
  [40,66,40,67,"Int"],
  [41,36,41,37,"Integer"],
  [41,48,41,56,"Day"],
  [41,67,41,68,"Int"],
  [42,35,42,40,"[Char]"],
  [42,49,42,50,"Int"],
  [42,62,42,67,"Bool"],
  [56,1,71,3,"CalendarTime -> Integer"],
  [56,8,56,10,"CalendarTime"],
  [57,5,57,73,"Integer"],
  [57,5,57,19,"TimeDiff -> Integer"],
  [57,20,57,73,"TimeDiff"],
  [57,21,57,72,"TimeDiff"],
  [57,21,57,52,"ClockTime -> TimeDiff"],
  [57,21,57,35,"ClockTime -> ClockTime -> TimeDiff"],
  [57,36,57,52,"ClockTime"],
  [57,37,57,51,"ClockTime"],
  [57,37,57,48,"CalendarTime -> ClockTime"],
  [57,49,57,51,"CalendarTime"],
  [57,53,57,72,"ClockTime"],
  [57,54,57,71,"ClockTime"],
  [57,54,57,65,"CalendarTime -> ClockTime"],
  [57,66,57,71,"CalendarTime"],
  [74,1,82,56,"CalendarTime -> IO Integer"],
  [74,11,74,13,"CalendarTime"],
  [75,5,77,29,"IO Integer"],
  [75,19,75,41,"IO CalendarTime"],
  [75,19,75,33,"ClockTime -> IO CalendarTime"],
  [75,34,75,41,"ClockTime"],
  [75,8,75,15,"CalendarTime"],
  [76,20,76,44,"CalendarTime"],
  [76,20,76,22,"CalendarTime"],
  [76,31,76,43,"Int"],
  [76,31,76,35,"CalendarTime -> Int"],
  [76,36,76,43,"CalendarTime"],
  [76,12,76,44,"CalendarTime"],
  [77,8,77,29,"IO Integer"],
  [77,8,77,14,"Integer -> IO Integer"],
  [77,15,77,16,"(Integer -> IO Integer) -> Integer -> IO Integer"],
  [77,17,77,29,"Integer"],
  [77,17,77,23,"CalendarTime -> Integer"],
  [77,24,77,29,"CalendarTime"],
  [78,21,78,35,"ClockTime"],
  [78,21,78,32,"CalendarTime -> ClockTime"],
  [78,33,78,35,"CalendarTime"],
  [78,11,78,35,"ClockTime"],
  [84,1,94,23,"TimeDiff -> Integer"],
  [84,16,84,18,"TimeDiff"],
  [85,5,90,65,"Integer"],
  [85,5,85,30,"Integer"],
  [85,6,85,29,"Integer"],
  [85,6,85,18,"Int -> Integer"],
  [85,19,85,20,"(Int -> Integer) -> Int -> Integer"],
  [85,21,85,29,"Int"],
  [85,21,85,26,"TimeDiff -> Int"],
  [85,27,85,29,"TimeDiff"],
  [85,31,85,32,"Integer -> Integer -> Integer"],
  [86,5,90,65,"Integer"],
  [86,5,86,7,"Integer"],
  [86,8,86,9,"Integer -> Integer -> Integer"],
  [86,10,90,65,"Integer"],
  [86,11,90,64,"Integer"],
  [86,11,86,36,"Integer"],
  [86,12,86,35,"Integer"],
  [86,12,86,24,"Int -> Integer"],
  [86,25,86,26,"(Int -> Integer) -> Int -> Integer"],
  [86,27,86,35,"Int"],
  [86,27,86,32,"TimeDiff -> Int"],
  [86,33,86,35,"TimeDiff"],
  [86,37,86,38,"Integer -> Integer -> Integer"],
  [87,11,90,64,"Integer"],
  [87,11,87,13,"Integer"],
  [87,14,87,15,"Integer -> Integer -> Integer"],
  [87,16,90,64,"Integer"],
  [87,17,90,63,"Integer"],
  [87,17,87,43,"Integer"],
  [87,18,87,42,"Integer"],
  [87,18,87,30,"Int -> Integer"],
  [87,31,87,32,"(Int -> Integer) -> Int -> Integer"],
  [87,33,87,42,"Int"],
  [87,33,87,39,"TimeDiff -> Int"],
  [87,40,87,42,"TimeDiff"],
  [87,44,87,45,"Integer -> Integer -> Integer"],
  [88,17,90,63,"Integer"],
  [88,17,88,19,"Integer"],
  [88,20,88,21,"Integer -> Integer -> Integer"],
  [88,22,90,63,"Integer"],
  [88,23,90,62,"Integer"],
  [88,23,88,48,"Integer"],
  [88,24,88,47,"Integer"],
  [88,24,88,36,"Int -> Integer"],
  [88,37,88,38,"(Int -> Integer) -> Int -> Integer"],
  [88,39,88,47,"Int"],
  [88,39,88,44,"TimeDiff -> Int"],
  [88,45,88,47,"TimeDiff"],
  [88,49,88,50,"Integer -> Integer -> Integer"],
  [89,23,90,62,"Integer"],
  [89,23,89,25,"Integer"],
  [89,26,89,27,"Integer -> Integer -> Integer"],
  [89,28,90,62,"Integer"],
  [89,29,90,61,"Integer"],
  [89,29,89,56,"Integer"],
  [89,30,89,55,"Integer"],
  [89,30,89,42,"Int -> Integer"],
  [89,43,89,44,"(Int -> Integer) -> Int -> Integer"],
  [89,45,89,55,"Int"],
  [89,45,89,52,"TimeDiff -> Int"],
  [89,53,89,55,"TimeDiff"],
  [89,57,89,58,"Integer -> Integer -> Integer"],
  [90,29,90,61,"Integer"],
  [90,29,90,32,"Integer"],
  [90,33,90,34,"Integer -> Integer -> Integer"],
  [90,35,90,61,"Integer"],
  [90,36,90,60,"Integer"],
  [90,36,90,48,"Int -> Integer"],
  [90,49,90,50,"(Int -> Integer) -> Int -> Integer"],
  [90,51,90,60,"Int"],
  [90,51,90,57,"TimeDiff -> Int"],
  [90,58,90,60,"TimeDiff"],
  [96,1,107,61,"a -> ClockTime"],
  [96,18,96,19,"a"],
  [97,5,97,24,"ClockTime"],
  [97,5,97,16,"Integer -> ClockTime"],
  [97,5,97,8,"Integer -> Integer -> ClockTime"],
  [97,9,97,16,"Integer"],
  [97,17,97,24,"Integer"],
  [98,20,98,32,"Rational"],
  [98,20,98,30,"a -> Rational"],
  [98,31,98,32,"a"],
  [98,11,98,32,"Rational"],
  [99,21,99,33,"Integer"],
  [99,21,99,26,"Rational -> Integer"],
  [99,27,99,33,"Rational"],
  [99,11,99,33,"Integer"],
  [100,21,100,73,"Integer"],
  [100,21,100,26,"Rational -> Integer"],
  [100,27,100,28,"(Rational -> Integer) -> Rational -> Integer"],
  [100,29,100,73,"Rational"],
  [100,29,100,54,"Rational"],
  [100,30,100,52,"Rational"],
  [100,30,100,36,"Rational"],
  [100,37,100,38,"Rational -> Rational -> Rational"],
  [100,39,100,52,"Ratio Integer"],
  [100,40,100,51,"Ratio Integer"],
  [100,40,100,47,"Integer"],
  [100,48,100,49,"Integer -> Integer -> Ratio Integer"],
  [100,50,100,51,"Integer"],
  [100,55,100,56,"Rational -> Rational -> Rational"],
  [100,57,100,73,"Rational"],
  [100,11,100,73,"Integer"],
  [101,30,101,37,"Rational"],
  [101,30,101,32,"Rational"],
  [101,33,101,34,"Rational -> Integer -> Rational"],
  [101,35,101,37,"Integer"],
  [101,11,101,37,"Rational"],
  [109,32,109,47,"a"],
  [109,32,109,43,"Integer -> a"],
  [109,44,109,47,"Integer"],
  [109,1,117,3,"ClockTime -> a"],
  [109,18,109,29,"ClockTime"],
  [109,19,109,28,"ClockTime"],
  [109,23,109,26,"Integer"],
  [109,27,109,28,"Integer"],
  [119,16,119,61,"String"],
  [119,16,119,24,"TimeDiff -> String"],
  [119,25,119,26,"(TimeDiff -> String) -> TimeDiff -> String"],
  [119,27,119,61,"TimeDiff"],
  [119,27,119,51,"ClockTime -> TimeDiff"],
  [119,27,119,41,"ClockTime -> ClockTime -> TimeDiff"],
  [119,42,119,51,"ClockTime"],
  [119,43,119,50,"ClockTime"],
  [119,43,119,48,"Integer -> ClockTime"],
  [119,43,119,46,"Integer -> Integer -> ClockTime"],
  [119,47,119,48,"Integer"],
  [119,49,119,50,"Integer"],
  [119,52,119,61,"ClockTime"],
  [119,53,119,60,"ClockTime"],
  [119,53,119,58,"Integer -> ClockTime"],
  [119,53,119,56,"Integer -> Integer -> ClockTime"],
  [119,57,119,58,"Integer"],
  [119,59,119,60,"Integer"],
  [119,1,122,10,"Integer -> String"],
  [119,12,119,13,"Integer"],
  [124,1,133,76,"TimeDiff -> String"],
  [124,10,124,13,"TimeDiff"],
  [125,5,127,65,"String"],
  [125,10,125,21,"[(Int, Char)]"],
  [126,13,126,17,"[Char]"],
  [126,7,126,9,"[(Int, Char)]"],
  [127,12,127,65,"String"],
  [127,12,127,51,"[(Int, Char)] -> [Char]"],
  [127,12,127,18,"[[Char]] -> [Char]"],
  [127,19,127,20,"([[Char]] -> [Char]) -> ([(Int, Char)] -> [[Char]]) -> [(Int, Char)] -> [Char]"],
  [127,21,127,51,"[(Int, Char)] -> [[Char]]"],
  [127,21,127,24,"((Int, Char) -> [Char]) -> [(Int, Char)] -> [[Char]]"],
  [127,25,127,51,"(Int, Char) -> [Char]"],
  [127,26,127,50,"(Int, Char) -> [Char]"],
  [127,37,127,50,"[Char]"],
  [127,37,127,43,"String"],
  [127,37,127,41,"Int -> String"],
  [127,42,127,43,"Int"],
  [127,44,127,46,"[Char] -> [Char] -> [Char]"],
  [127,47,127,50,"[Char]"],
  [127,48,127,49,"Char"],
  [127,52,127,53,"([(Int, Char)] -> String) -> [(Int, Char)] -> String"],
  [127,54,127,65,"[(Int, Char)]"],
  [127,7,127,8,"[(Int, Char)]"],
  [127,27,127,33,"(Int, Char)"],
  [127,28,127,29,"Int"],
  [127,31,127,32,"Char"],
  [128,16,128,37,"TimeDiff"],
  [128,16,128,33,"TimeDiff -> TimeDiff"],
  [128,34,128,37,"TimeDiff"],
  [128,11,128,37,"TimeDiff"],
  [129,24,129,32,"[Char]"],
  [129,11,129,32,"[Char]"],
  [130,23,130,77,"[Int]"],
  [130,24,130,73,"TimeDiff -> [Int]"],
  [130,54,130,73,"[Int]"],
  [130,55,130,56,"Int"],
  [130,58,130,60,"Int"],
  [130,62,130,63,"Int"],
  [130,65,130,66,"Int"],
  [130,68,130,69,"Int"],
  [130,71,130,72,"Int"],
  [130,75,130,77,"TimeDiff"],
  [130,11,130,77,"[Int]"],
  [130,25,130,50,"TimeDiff"],
  [130,26,130,49,"TimeDiff"],
  [130,35,130,36,"Int"],
  [130,37,130,39,"Int"],
  [130,40,130,41,"Int"],
  [130,42,130,43,"Int"],
  [130,44,130,45,"Int"],
  [130,46,130,47,"Int"],
  [130,48,130,49,"Integer"],
  [131,24,131,48,"[(Int, Char)]"],
  [131,24,131,37,"[Char] -> [(Int, Char)]"],
  [131,24,131,27,"[Int] -> [Char] -> [(Int, Char)]"],
  [131,28,131,37,"[Int]"],
  [131,38,131,48,"[Char]"],
  [131,11,131,48,"[(Int, Char)]"],
  [133,25,133,76,"[(Int, Char)]"],
  [133,25,133,63,"[(Int, Char)] -> [(Int, Char)]"],
  [133,25,133,31,"[(Int, Char)] -> [(Int, Char)]"],
  [133,25,133,29,"Int -> [(Int, Char)] -> [(Int, Char)]"],
  [133,30,133,31,"Int"],
  [133,32,133,33,"([(Int, Char)] -> [(Int, Char)]) -> ([(Int, Char)] -> [(Int, Char)]) -> [(Int, Char)] -> [(Int, Char)]"],
  [133,34,133,63,"[(Int, Char)] -> [(Int, Char)]"],
  [133,34,133,43,"((Int, Char) -> Bool) -> [(Int, Char)] -> [(Int, Char)]"],
  [133,44,133,63,"(Int, Char) -> Bool"],
  [133,45,133,62,"(Int, Char) -> Bool"],
  [133,56,133,62,"Bool"],
  [133,56,133,57,"Int"],
  [133,58,133,60,"Int -> Int -> Bool"],
  [133,61,133,62,"Int"],
  [133,64,133,65,"([(Int, Char)] -> [(Int, Char)]) -> [(Int, Char)] -> [(Int, Char)]"],
  [133,66,133,76,"[(Int, Char)]"],
  [133,11,133,76,"[(Int, Char)]"],
  [133,46,133,52,"(Int, Char)"],
  [133,47,133,48,"Int"],
  [133,50,133,51,"Char"]
  ];
