//******************************************************************************
// Use this to change size
const term = new Terminal({ cols: 125, cursorBlink: false, rows: 51, experimentalCharAtlas: "dynamic", scrollback: 0, letterSpacing: 0, renderer: "dom" });
// Don't touch this stuff
//******************************************************************************
term.open(document.getElementById('terminal'));
//******************************************************************************

var intInput;

// This place is a mess.  It sets the default files, don't touch.
{
	// ☢◢◣╳
	var hudString = "[0m[38;5;15m#######################################################################################################################\r\n" +
					"[38;5;15m#  Player  #  Layers   # Currently Selected #    [38;5;226m●[38;5;230m●[38;5;15m   ->    [38;5;226m●[38;5;230m●[38;5;28m●[38;5;15m  /\\    [38;5;226m●[38;5;230m●[38;5;240m●[38;5;7m$[38;5;4m●[38;5;15m   =>  #  W/A/S/D: Cursor    R/F: Scroll  #\r\n" +
					"[38;5;15m#  [38;5;1m1[38;5;4m2[38;5;15m3[38;5;202m4[38;5;161m5[38;5;40m6[38;5;15m  #           ######################  [38;5;226m●[38;5;230m●[38;5;240m●[38;5;4m●[38;5;15m   >>>    [38;5;166m●[38;5;240m●[38;5;15m  ██▄▄              #  `~: Repaint        E: Entities  #\r\n" +
					"[38;5;15m#          #  1 2 3 4  #                    #                          [38;5;226m●[38;5;230m●[38;5;240m●[38;5;7m$$[38;5;15m  >=>  #  1: Next Player     Q: Item      #\r\n" +
					"[38;5;15m#  Bumps   #           #                    #   [38;5;226m●[38;5;230m●[38;5;28m●[38;5;15m  _/⎣_    [38;5;226m●[38;5;230m●[38;5;15m  /\\                #  Z/X: Cycle Layers  T: Move Item #\r\n" +
					"[38;5;15m#  C / T   #           #                    #        \\__/    [38;5;28m●[38;5;166m●[38;5;15m  ██     [38;5;240m●[38;5;240m●[38;5;240m●[38;5;40m$[38;5;15m  ===  #  C: Toggle Layer    H: Help      #\r\n" +
					"[38;5;15m#######################################################################################################################"

	var baseBlankMap = "                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ";

	var genWorkMap = "                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                       .---------.                   .---------.                                       ╳                                      /33333333333\\                 /55555555555\\                                      ╳                                     /3333333333333\\               /5555555555555\\                                     ╳                                    /333333333333333\\             /555555555555555\\                                    ╳                                   /33333333333333333\\           /55555555555555555\\                                   ╳                        .---------.\\44444444444444444/.---------.\\66666666666666666/.---------.                        ╳                       /77777777777\\\\444444444444444//99999999999\\\\666666666666666//AAAAAAAAAAA\\                       ╳                      /7777777777777\\\\4444444444444//9999999999999\\\\6666666666666//AAAAAAAAAAAAA\\                      ╳                     /777777777777777\\\\44444444444//999999999999999\\\\66666666666//AAAAAAAAAAAAAAA\\                     ╳                    /77777777777777777\\'---------'/99999999999999999\\'---------'/AAAAAAAAAAAAAAAAA\\                    ╳         .---------.\\88888888888888888/.---------.\\00000000000000000/.---------.\\aaaaaaaaaaaaaaaaa/.---------.         ╳        /BBBBBBBBBBB\\\\888888888888888//CCCCCCCCCCC\\\\000000000000000//DDDDDDDDDDD\\\\aaaaaaaaaaaaaaa//EEEEEEEEEEE\\        ╳       /BBBBBBBBBBBBB\\\\8888888888888//CCCCCCCCCCCCC\\\\0000000000000//DDDDDDDDDDDDD\\\\aaaaaaaaaaaaa//EEEEEEEEEEEEE\\       ╳      /BBBBBBBBBBBBBBB\\\\88888888888//CCCCCCCCCCCCCCC\\\\00000000000//DDDDDDDDDDDDDDD\\\\aaaaaaaaaaa//EEEEEEEEEEEEEEE\\      ╳     /BBBBBBBBBBBBBBBBB\\'---------'/CCCCCCCCCCCCCCCCC\\'---------'/DDDDDDDDDDDDDDDDD\\'---------'/EEEEEEEEEEEEEEEEE\\     ╳     \\bbbbbbbbbbbbbbbbb/.---------.\\ccccccccccccccccc/.---------.\\ddddddddddddddddd/.---------.\\eeeeeeeeeeeeeeeee/     ╳      \\bbbbbbbbbbbbbbb//╬╬╬╬╬╬╬╬╬╬╬\\\\ccccccccccccccc//GGGGGGGGGGG\\\\ddddddddddddddd//HHHHHHHHHHH\\\\eeeeeeeeeeeeeee/      ╳       \\bbbbbbbbbbbbb//╬╬╬╬╬╬╬╬╬╬╬╬╬\\\\ccccccccccccc//GGGGGGGGGGGGG\\\\ddddddddddddd//HHHHHHHHHHHHH\\\\eeeeeeeeeeeee/       ╳        \\bbbbbbbbbbb//╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬\\\\ccccccccccc//GGGGGGGGGGGGGGG\\\\ddddddddddd//HHHHHHHHHHHHHHH\\\\eeeeeeeeeee/        ╳         '---------'/╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬\\'---------'/GGGGGGGGGGGGGGGGG\\'---------'/HHHHHHHHHHHHHHHHH\\'---------'         ╳         .---------.\\fffffffffffffffff/.---------.\\ggggggggggggggggg/.---------.\\hhhhhhhhhhhhhhhhh/.---------.         ╳        /IIIIIIIIIII\\\\fffffffffffffff//JJJJJJJJJJJ\\\\ggggggggggggggg//KKKKKKKKKKK\\\\hhhhhhhhhhhhhhh//LLLLLLLLLLL\\        ╳       /IIIIIIIIIIIII\\\\fffffffffffff//JJJJJJJJJJJJJ\\\\ggggggggggggg//KKKKKKKKKKKKK\\\\hhhhhhhhhhhhh//LLLLLLLLLLLLL\\       ╳      /IIIIIIIIIIIIIII\\\\fffffffffff//JJJJJJJJJJJJJJJ\\\\ggggggggggg//KKKKKKKKKKKKKKK\\\\hhhhhhhhhhh//LLLLLLLLLLLLLLL\\      ╳     /IIIIIIIIIIIIIIIII\\'---------'/JJJJJJJJJJJJJJJJJ\\'---------'/KKKKKKKKKKKKKKKKK\\'---------'/LLLLLLLLLLLLLLLLL\\     ╳     \\iiiiiiiiiiiiiiiii/.---------.\\jjjjjjjjjjjjjjjjj/.---------.\\kkkkkkkkkkkkkkkkk/.---------.\\lllllllllllllllll/     ╳      \\iiiiiiiiiiiiiii//MMMMMMMMMMM\\\\jjjjjjjjjjjjjjj//NNNNNNNNNNN\\\\kkkkkkkkkkkkkkk//OOOOOOOOOOO\\\\lllllllllllllll/      ╳       \\iiiiiiiiiiiii//MMMMMMMMMMMMM\\\\jjjjjjjjjjjjj//NNNNNNNNNNNNN\\\\kkkkkkkkkkkkk//OOOOOOOOOOOOO\\\\lllllllllllll/       ╳        \\iiiiiiiiiii//MMMMMMMMMMMMMMM\\\\jjjjjjjjjjj//NNNNNNNNNNNNNNN\\\\kkkkkkkkkkk//OOOOOOOOOOOOOOO\\\\lllllllllll/        ╳         '---------'/MMMMMMMMMMMMMMMMM\\'---------'/NNNNNNNNNNNNNNNNN\\'---------'/OOOOOOOOOOOOOOOOO\\'---------'         ╳         .---------.\\mmmmmmmmmmmmmmmmm/.---------.\\nnnnnnnnnnnnnnnnn/.---------.\\ooooooooooooooooo/.---------.         ╳        /PPPPPPPPPPP\\\\mmmmmmmmmmmmmmm//QQQQQQQQQQQ\\\\nnnnnnnnnnnnnnn//RRRRRRRRRRR\\\\ooooooooooooooo//SSSSSSSSSSS\\        ╳       /PPPPPPPPPPPPP\\\\mmmmmmmmmmmmm//QQQQQQQQQQQQQ\\\\nnnnnnnnnnnnn//RRRRRRRRRRRRR\\\\ooooooooooooo//SSSSSSSSSSSSS\\       ╳      /PPPPPPPPPPPPPPP\\\\mmmmmmmmmmm//QQQQQQQQQQQQQQQ\\\\nnnnnnnnnnn//RRRRRRRRRRRRRRR\\\\ooooooooooo//SSSSSSSSSSSSSSS\\      ╳     /PPPPPPPPPPPPPPPPP\\'---------'/QQQQQQQQQQQQQQQQQ\\'---------'/RRRRRRRRRRRRRRRRR\\'---------'/SSSSSSSSSSSSSSSSS\\     ╳     \\ppppppppppppppppp/.---------.\\qqqqqqqqqqqqqqqqq/.---------.\\rrrrrrrrrrrrrrrrr/.---------.\\sssssssssssssssss/     ╳      \\ppppppppppppppp//TTTTTTTTTTT\\\\qqqqqqqqqqqqqqq//UUUUUUUUUUU\\\\rrrrrrrrrrrrrrr//VVVVVVVVVVV\\\\sssssssssssssss/      ╳       \\ppppppppppppp//TTTTTTTTTTTTT\\\\qqqqqqqqqqqqq//UUUUUUUUUUUUU\\\\rrrrrrrrrrrrr//VVVVVVVVVVVVV\\\\sssssssssssss/       ╳        \\ppppppppppp//TTTTTTTTTTTTTTT\\\\qqqqqqqqqqq//UUUUUUUUUUUUUUU\\\\rrrrrrrrrrr//VVVVVVVVVVVVVVV\\\\sssssssssss/        ╳         '---------'/TTTTTTTTTTTTTTTTT\\'---------'/UUUUUUUUUUUUUUUUU\\'---------'/VVVVVVVVVVVVVVVVV\\'---------'         ╳         .---------.\\ttttttttttttttttt/.---------.\\uuuuuuuuuuuuuuuuu/.---------.\\vvvvvvvvvvvvvvvvv/.---------.         ╳        /WWWWWWWWWWW\\\\ttttttttttttttt//XXXXXXXXXXX\\\\uuuuuuuuuuuuuuu//YYYYYYYYYYY\\\\vvvvvvvvvvvvvvv//ZZZZZZZZZZZ\\        ╳       /WWWWWWWWWWWWW\\\\ttttttttttttt//XXXXXXXXXXXXX\\\\uuuuuuuuuuuuu//YYYYYYYYYYYYY\\\\vvvvvvvvvvvvv//ZZZZZZZZZZZZZ\\       ╳      /WWWWWWWWWWWWWWW\\\\ttttttttttt//XXXXXXXXXXXXXXX\\\\uuuuuuuuuuu//YYYYYYYYYYYYYYY\\\\vvvvvvvvvvv//ZZZZZZZZZZZZZZZ\\      ╳     /WWWWWWWWWWWWWWWWW\\'---------'/XXXXXXXXXXXXXXXXX\\'---------'/YYYYYYYYYYYYYYYYY\\'---------'/ZZZZZZZZZZZZZZZZZ\\     ╳     \\wwwwwwwwwwwwwwwww/.---------.\\xxxxxxxxxxxxxxxxx/.---------.\\yyyyyyyyyyyyyyyyy/.---------.\\zzzzzzzzzzzzzzzzz/     ╳      \\wwwwwwwwwwwwwww//~~~~~~~~~~~\\\\xxxxxxxxxxxxxxx//!!!!!!!!!!!\\\\yyyyyyyyyyyyyyy//###########\\\\zzzzzzzzzzzzzzz/      ╳       \\wwwwwwwwwwwww//~~~~~~~~~~~~~\\\\xxxxxxxxxxxxx//!!!!!!!!!!!!!\\\\yyyyyyyyyyyyy//#############\\\\zzzzzzzzzzzzz/       ╳        \\wwwwwwwwwww//~~~~~~~~~~~~~~~\\\\xxxxxxxxxxx//!!!!!!!!!!!!!!!\\\\yyyyyyyyyyy//###############\\\\zzzzzzzzzzz/        ╳         '---------'/~~~~~~~~~~~~~~~~~\\'---------'/!!!!!!!!!!!!!!!!!\\'---------'/#################\\'---------'         ╳         .---------.\\`````````````````/.---------.\\@@@@@@@@@@@@@@@@@/.---------.\\$$$$$$$$$$$$$$$$$/.---------.         ╳        /%%%%%%%%%%%\\\\```````````````//&&&&&&&&&&&\\\\@@@@@@@@@@@@@@@//(((((((((((\\\\$$$$$$$$$$$$$$$//+++++++++++\\        ╳       /%%%%%%%%%%%%%\\\\`````````````//&&&&&&&&&&&&&\\\\@@@@@@@@@@@@@//(((((((((((((\\\\$$$$$$$$$$$$$//+++++++++++++\\       ╳      /%%%%%%%%%%%%%%%\\\\```````````//&&&&&&&&&&&&&&&\\\\@@@@@@@@@@@//(((((((((((((((\\\\$$$$$$$$$$$//+++++++++++++++\\      ╳     /%%%%%%%%%%%%%%%%%\\'---------'/&&&&&&&&&&&&&&&&&\\'---------'/(((((((((((((((((\\'---------'/+++++++++++++++++\\     ╳     \\^^^^^^^^^^^^^^^^^/.---------.\\*****************/.---------.\\)))))))))))))))))/.---------.\\=================/     ╳      \\^^^^^^^^^^^^^^^//{{{{{{{{{{{\\\\***************//[[[[[[[[[[[\\\\)))))))))))))))//|||||||||||\\\\===============/      ╳       \\^^^^^^^^^^^^^//{{{{{{{{{{{{{\\\\*************//[[[[[[[[[[[[[\\\\)))))))))))))//|||||||||||||\\\\=============/       ╳        \\^^^^^^^^^^^//{{{{{{{{{{{{{{{\\\\***********//[[[[[[[[[[[[[[[\\\\)))))))))))//|||||||||||||||\\\\===========/        ╳         '---------'/{{{{{{{{{{{{{{{{{\\'---------'/[[[[[[[[[[[[[[[[[\\'---------'/|||||||||||||||||\\'---------'         ╳         .---------.\\}}}}}}}}}}}}}}}}}/.---------.\\]]]]]]]]]]]]]]]]]/.---------.\\_________________/.---------.         ╳        /:::::::::::\\\\}}}}}}}}}}}}}}}//<<<<<<<<<<<\\\\]]]]]]]]]]]]]]]//...........\\\\_______________//???????????\\        ╳       /:::::::::::::\\\\}}}}}}}}}}}}}//<<<<<<<<<<<<<\\\\]]]]]]]]]]]]]//.............\\\\_____________//?????????????\\       ╳      /:::::::::::::::\\\\}}}}}}}}}}}//<<<<<<<<<<<<<<<\\\\]]]]]]]]]]]//...............\\\\___________//???????????????\\      ╳     /:::::::::::::::::\\'---------'/<<<<<<<<<<<<<<<<<\\'---------'/.................\\'---------'/?????????????????\\     ╳     \\;;;;;;;;;;;;;;;;;/.---------.\\>>>>>>>>>>>>>>>>>/.---------.\\,,,,,,,,,,,,,,,,,/.---------.\\─────────────────/     ╳      \\;;;;;;;;;;;;;;;//━━━━━━━━━━━\\\\>>>>>>>>>>>>>>>//┃┃┃┃┃┃┃┃┃┃┃\\\\,,,,,,,,,,,,,,,//┅┅┅┅┅┅┅┅┅┅┅\\\\───────────────/      ╳       \\;;;;;;;;;;;;;//━━━━━━━━━━━━━\\\\>>>>>>>>>>>>>//┃┃┃┃┃┃┃┃┃┃┃┃┃\\\\,,,,,,,,,,,,,//┅┅┅┅┅┅┅┅┅┅┅┅┅\\\\─────────────/       ╳        \\;;;;;;;;;;;//━━━━━━━━━━━━━━━\\\\>>>>>>>>>>>//┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃\\\\,,,,,,,,,,,//┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\\\\───────────/        ╳         '---------'/━━━━━━━━━━━━━━━━━\\'---------'/┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃\\'---------'/┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\\'---------'         ╳                    \\│││││││││││││││││/.---------.\\┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄/.---------.\\┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆/                    ╳                     \\│││││││││││││││//┇┇┇┇┇┇┇┇┇┇┇\\\\┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄//┉┉┉┉┉┉┉┉┉┉┉\\\\┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆/                     ╳                      \\│││││││││││││//┇┇┇┇┇┇┇┇┇┇┇┇┇\\\\┄┄┄┄┄┄┄┄┄┄┄┄┄//┉┉┉┉┉┉┉┉┉┉┉┉┉\\\\┆┆┆┆┆┆┆┆┆┆┆┆┆/                      ╳                       \\│││││││││││//┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇\\\\┄┄┄┄┄┄┄┄┄┄┄//┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉\\\\┆┆┆┆┆┆┆┆┆┆┆/                       ╳                        '---------'/┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇\\'---------'/┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉\\'---------'                        ╳                                   \\┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈/           \\┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊/                                   ╳                                    \\┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈/             \\┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊/                                    ╳                                     \\┈┈┈┈┈┈┈┈┈┈┈┈┈/               \\┊┊┊┊┊┊┊┊┊┊┊┊┊/                                     ╳                                      \\┈┈┈┈┈┈┈┈┈┈┈/                 \\┊┊┊┊┊┊┊┊┊┊┊/                                      ╳                                       '---------'                   '---------'                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ╳                                                                                                                       ";

	var genColorWork = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF33333333333FFFFFFFFFFFFFFFFFFF55555555555FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF3333333333333FFFFFFFFFFFFFFFFF5555555555555FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF333333333333333FFFFFFFFFFFFFFF555555555555555FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF33333333333333333FFFFFFFFFFFFF55555555555555555FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF44444444444444444FFFFFFFFFFFFF66666666666666666FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFF77777777777FF444444444444444FF99999999999FF666666666666666FFAAAAAAAAAAAFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFF7777777777777FF4444444444444FF9999999999999FF6666666666666FFAAAAAAAAAAAAAFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFF777777777777777FF44444444444FF999999999999999FF66666666666FFAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF77777777777777777FFFFFFFFFFFFF99999999999999999FFFFFFFFFFFFFAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF88888888888888888FFFFFFFFFFFFF00000000000000000FFFFFFFFFFFFFaaaaaaaaaaaaaaaaaFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFBBBBBBBBBBBFF888888888888888FFCCCCCCCCCCCFF000000000000000FFDDDDDDDDDDDFFaaaaaaaaaaaaaaaFFEEEEEEEEEEEFFFFFFFFF╳FFFFFFFFBBBBBBBBBBBBBFF8888888888888FFCCCCCCCCCCCCCFF0000000000000FFDDDDDDDDDDDDDFFaaaaaaaaaaaaaFFEEEEEEEEEEEEEFFFFFFFF╳FFFFFFFBBBBBBBBBBBBBBBFF88888888888FFCCCCCCCCCCCCCCCFF00000000000FFDDDDDDDDDDDDDDDFFaaaaaaaaaaaFFEEEEEEEEEEEEEEEFFFFFFF╳FFFFFFBBBBBBBBBBBBBBBBBFFFFFFFFFFFFFCCCCCCCCCCCCCCCCCFFFFFFFFFFFFFDDDDDDDDDDDDDDDDDFFFFFFFFFFFFFEEEEEEEEEEEEEEEEEFFFFFF╳FFFFFFbbbbbbbbbbbbbbbbbFFFFFFFFFFFFFcccccccccccccccccFFFFFFFFFFFFFdddddddddddddddddFFFFFFFFFFFFFeeeeeeeeeeeeeeeeeFFFFFF╳FFFFFFFbbbbbbbbbbbbbbbFF╬╬╬╬╬╬╬╬╬╬╬FFcccccccccccccccFFGGGGGGGGGGGFFdddddddddddddddFFHHHHHHHHHHHFFeeeeeeeeeeeeeeeFFFFFFF╳FFFFFFFFbbbbbbbbbbbbbFF╬╬╬╬╬╬╬╬╬╬╬╬╬FFcccccccccccccFFGGGGGGGGGGGGGFFdddddddddddddFFHHHHHHHHHHHHHFFeeeeeeeeeeeeeFFFFFFFF╳FFFFFFFFFbbbbbbbbbbbFF╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬FFcccccccccccFFGGGGGGGGGGGGGGGFFdddddddddddFFHHHHHHHHHHHHHHHFFeeeeeeeeeeeFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬FFFFFFFFFFFFFGGGGGGGGGGGGGGGGGFFFFFFFFFFFFFHHHHHHHHHHHHHHHHHFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFfffffffffffffffffFFFFFFFFFFFFFgggggggggggggggggFFFFFFFFFFFFFhhhhhhhhhhhhhhhhhFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFIIIIIIIIIIIFFfffffffffffffffFFJJJJJJJJJJJFFgggggggggggggggFFKKKKKKKKKKKFFhhhhhhhhhhhhhhhFFLLLLLLLLLLLFFFFFFFFF╳FFFFFFFFIIIIIIIIIIIIIFFfffffffffffffFFJJJJJJJJJJJJJFFgggggggggggggFFKKKKKKKKKKKKKFFhhhhhhhhhhhhhFFLLLLLLLLLLLLLFFFFFFFF╳FFFFFFFIIIIIIIIIIIIIIIFFfffffffffffFFJJJJJJJJJJJJJJJFFgggggggggggFFKKKKKKKKKKKKKKKFFhhhhhhhhhhhFFLLLLLLLLLLLLLLLFFFFFFF╳FFFFFFIIIIIIIIIIIIIIIIIFFFFFFFFFFFFFJJJJJJJJJJJJJJJJJFFFFFFFFFFFFFKKKKKKKKKKKKKKKKKFFFFFFFFFFFFFLLLLLLLLLLLLLLLLLFFFFFF╳FFFFFFiiiiiiiiiiiiiiiiiFFFFFFFFFFFFFjjjjjjjjjjjjjjjjjFFFFFFFFFFFFFkkkkkkkkkkkkkkkkkFFFFFFFFFFFFFlllllllllllllllllFFFFFF╳FFFFFFFiiiiiiiiiiiiiiiFFMMMMMMMMMMMFFjjjjjjjjjjjjjjjFFNNNNNNNNNNNFFkkkkkkkkkkkkkkkFFOOOOOOOOOOOFFlllllllllllllllFFFFFFF╳FFFFFFFFiiiiiiiiiiiiiFFMMMMMMMMMMMMMFFjjjjjjjjjjjjjFFNNNNNNNNNNNNNFFkkkkkkkkkkkkkFFOOOOOOOOOOOOOFFlllllllllllllFFFFFFFF╳FFFFFFFFFiiiiiiiiiiiFFMMMMMMMMMMMMMMMFFjjjjjjjjjjjFFNNNNNNNNNNNNNNNFFkkkkkkkkkkkFFOOOOOOOOOOOOOOOFFlllllllllllFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFMMMMMMMMMMMMMMMMMFFFFFFFFFFFFFNNNNNNNNNNNNNNNNNFFFFFFFFFFFFFOOOOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFmmmmmmmmmmmmmmmmmFFFFFFFFFFFFFnnnnnnnnnnnnnnnnnFFFFFFFFFFFFFoooooooooooooooooFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFPPPPPPPPPPPFFmmmmmmmmmmmmmmmFFQQQQQQQQQQQFFnnnnnnnnnnnnnnnFFRRRRRRRRRRRFFoooooooooooooooFFSSSSSSSSSSSFFFFFFFFF╳FFFFFFFFPPPPPPPPPPPPPFFmmmmmmmmmmmmmFFQQQQQQQQQQQQQFFnnnnnnnnnnnnnFFRRRRRRRRRRRRRFFoooooooooooooFFSSSSSSSSSSSSSFFFFFFFF╳FFFFFFFPPPPPPPPPPPPPPPFFmmmmmmmmmmmFFQQQQQQQQQQQQQQQFFnnnnnnnnnnnFFRRRRRRRRRRRRRRRFFoooooooooooFFSSSSSSSSSSSSSSSFFFFFFF╳FFFFFFPPPPPPPPPPPPPPPPPFFFFFFFFFFFFFQQQQQQQQQQQQQQQQQFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRFFFFFFFFFFFFFSSSSSSSSSSSSSSSSSFFFFFF╳FFFFFFpppppppppppppppppFFFFFFFFFFFFFqqqqqqqqqqqqqqqqqFFFFFFFFFFFFFrrrrrrrrrrrrrrrrrFFFFFFFFFFFFFsssssssssssssssssFFFFFF╳FFFFFFFpppppppppppppppFFTTTTTTTTTTTFFqqqqqqqqqqqqqqqFFUUUUUUUUUUUFFrrrrrrrrrrrrrrrFFVVVVVVVVVVVFFsssssssssssssssFFFFFFF╳FFFFFFFFpppppppppppppFFTTTTTTTTTTTTTFFqqqqqqqqqqqqqFFUUUUUUUUUUUUUFFrrrrrrrrrrrrrFFVVVVVVVVVVVVVFFsssssssssssssFFFFFFFF╳FFFFFFFFFpppppppppppFFTTTTTTTTTTTTTTTFFqqqqqqqqqqqFFUUUUUUUUUUUUUUUFFrrrrrrrrrrrFFVVVVVVVVVVVVVVVFFsssssssssssFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFTTTTTTTTTTTTTTTTTFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUFFFFFFFFFFFFFVVVVVVVVVVVVVVVVVFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFtttttttttttttttttFFFFFFFFFFFFFuuuuuuuuuuuuuuuuuFFFFFFFFFFFFFvvvvvvvvvvvvvvvvvFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFWWWWWWWWWWWFFtttttttttttttttFFXXXXXXXXXXXFFuuuuuuuuuuuuuuuFFYYYYYYYYYYYFFvvvvvvvvvvvvvvvFFZZZZZZZZZZZFFFFFFFFF╳FFFFFFFFWWWWWWWWWWWWWFFtttttttttttttFFXXXXXXXXXXXXXFFuuuuuuuuuuuuuFFYYYYYYYYYYYYYFFvvvvvvvvvvvvvFFZZZZZZZZZZZZZFFFFFFFF╳FFFFFFFWWWWWWWWWWWWWWWFFtttttttttttFFXXXXXXXXXXXXXXXFFuuuuuuuuuuuFFYYYYYYYYYYYYYYYFFvvvvvvvvvvvFFZZZZZZZZZZZZZZZFFFFFFF╳FFFFFFWWWWWWWWWWWWWWWWWFFFFFFFFFFFFFXXXXXXXXXXXXXXXXXFFFFFFFFFFFFFYYYYYYYYYYYYYYYYYFFFFFFFFFFFFFZZZZZZZZZZZZZZZZZFFFFFF╳FFFFFFwwwwwwwwwwwwwwwwwFFFFFFFFFFFFFxxxxxxxxxxxxxxxxxFFFFFFFFFFFFFyyyyyyyyyyyyyyyyyFFFFFFFFFFFFFzzzzzzzzzzzzzzzzzFFFFFF╳FFFFFFFwwwwwwwwwwwwwwwFF~~~~~~~~~~~FFxxxxxxxxxxxxxxxFF!!!!!!!!!!!FFyyyyyyyyyyyyyyyFF###########FFzzzzzzzzzzzzzzzFFFFFFF╳FFFFFFFFwwwwwwwwwwwwwFF~~~~~~~~~~~~~FFxxxxxxxxxxxxxFF!!!!!!!!!!!!!FFyyyyyyyyyyyyyFF#############FFzzzzzzzzzzzzzFFFFFFFF╳FFFFFFFFFwwwwwwwwwwwFF~~~~~~~~~~~~~~~FFxxxxxxxxxxxFF!!!!!!!!!!!!!!!FFyyyyyyyyyyyFF###############FFzzzzzzzzzzzFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF~~~~~~~~~~~~~~~~~FFFFFFFFFFFFF!!!!!!!!!!!!!!!!!FFFFFFFFFFFFF#################FFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF`````````````````FFFFFFFFFFFFF@@@@@@@@@@@@@@@@@FFFFFFFFFFFFF$$$$$$$$$$$$$$$$$FFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFF%%%%%%%%%%%FF```````````````FF&&&&&&&&&&&FF@@@@@@@@@@@@@@@FF(((((((((((FF$$$$$$$$$$$$$$$FF+++++++++++FFFFFFFFF╳FFFFFFFF%%%%%%%%%%%%%FF`````````````FF&&&&&&&&&&&&&FF@@@@@@@@@@@@@FF(((((((((((((FF$$$$$$$$$$$$$FF+++++++++++++FFFFFFFF╳FFFFFFF%%%%%%%%%%%%%%%FF```````````FF&&&&&&&&&&&&&&&FF@@@@@@@@@@@FF(((((((((((((((FF$$$$$$$$$$$FF+++++++++++++++FFFFFFF╳FFFFFF%%%%%%%%%%%%%%%%%FFFFFFFFFFFFF&&&&&&&&&&&&&&&&&FFFFFFFFFFFFF(((((((((((((((((FFFFFFFFFFFFF+++++++++++++++++FFFFFF╳FFFFFF^^^^^^^^^^^^^^^^^FFFFFFFFFFFFF*****************FFFFFFFFFFFFF)))))))))))))))))FFFFFFFFFFFFF=================FFFFFF╳FFFFFFF^^^^^^^^^^^^^^^FF{{{{{{{{{{{FF***************FF[[[[[[[[[[[FF)))))))))))))))FF|||||||||||FF===============FFFFFFF╳FFFFFFFF^^^^^^^^^^^^^FF{{{{{{{{{{{{{FF*************FF[[[[[[[[[[[[[FF)))))))))))))FF|||||||||||||FF=============FFFFFFFF╳FFFFFFFFF^^^^^^^^^^^FF{{{{{{{{{{{{{{{FF***********FF[[[[[[[[[[[[[[[FF)))))))))))FF|||||||||||||||FF===========FFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF{{{{{{{{{{{{{{{{{FFFFFFFFFFFFF[[[[[[[[[[[[[[[[[FFFFFFFFFFFFF|||||||||||||||||FFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF}}}}}}}}}}}}}}}}}FFFFFFFFFFFFF]]]]]]]]]]]]]]]]]FFFFFFFFFFFFF_________________FFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFF:::::::::::FF}}}}}}}}}}}}}}}FF<<<<<<<<<<<FF]]]]]]]]]]]]]]]FF...........FF_______________FF???????????FFFFFFFFF╳FFFFFFFF:::::::::::::FF}}}}}}}}}}}}}FF<<<<<<<<<<<<<FF]]]]]]]]]]]]]FF.............FF_____________FF?????????????FFFFFFFF╳FFFFFFF:::::::::::::::FF}}}}}}}}}}}FF<<<<<<<<<<<<<<<FF]]]]]]]]]]]FF...............FF___________FF???????????????FFFFFFF╳FFFFFF:::::::::::::::::FFFFFFFFFFFFF<<<<<<<<<<<<<<<<<FFFFFFFFFFFFF.................FFFFFFFFFFFFF?????????????????FFFFFF╳FFFFFF;;;;;;;;;;;;;;;;;FFFFFFFFFFFFF>>>>>>>>>>>>>>>>>FFFFFFFFFFFFF,,,,,,,,,,,,,,,,,FFFFFFFFFFFFF─────────────────FFFFFF╳FFFFFFF;;;;;;;;;;;;;;;FF━━━━━━━━━━━FF>>>>>>>>>>>>>>>FF┃┃┃┃┃┃┃┃┃┃┃FF,,,,,,,,,,,,,,,FF┅┅┅┅┅┅┅┅┅┅┅FF───────────────FFFFFFF╳FFFFFFFF;;;;;;;;;;;;;FF━━━━━━━━━━━━━FF>>>>>>>>>>>>>FF┃┃┃┃┃┃┃┃┃┃┃┃┃FF,,,,,,,,,,,,,FF┅┅┅┅┅┅┅┅┅┅┅┅┅FF─────────────FFFFFFFF╳FFFFFFFFF;;;;;;;;;;;FF━━━━━━━━━━━━━━━FF>>>>>>>>>>>FF┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃FF,,,,,,,,,,,FF┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅FF───────────FFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF━━━━━━━━━━━━━━━━━FFFFFFFFFFFFF┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃FFFFFFFFFFFFF┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅FFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFF│││││││││││││││││FFFFFFFFFFFFF┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄FFFFFFFFFFFFF┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆FFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFF│││││││││││││││FF┇┇┇┇┇┇┇┇┇┇┇FF┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄FF┉┉┉┉┉┉┉┉┉┉┉FF┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆FFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFF│││││││││││││FF┇┇┇┇┇┇┇┇┇┇┇┇┇FF┄┄┄┄┄┄┄┄┄┄┄┄┄FF┉┉┉┉┉┉┉┉┉┉┉┉┉FF┆┆┆┆┆┆┆┆┆┆┆┆┆FFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFF│││││││││││FF┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇FF┄┄┄┄┄┄┄┄┄┄┄FF┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉FF┆┆┆┆┆┆┆┆┆┆┆FFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇┇FFFFFFFFFFFFF┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈FFFFFFFFFFFFF┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈FFFFFFFFFFFFFFF┊┊┊┊┊┊┊┊┊┊┊┊┊┊┊FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF┈┈┈┈┈┈┈┈┈┈┈┈┈FFFFFFFFFFFFFFFFF┊┊┊┊┊┊┊┊┊┊┊┊┊FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF┈┈┈┈┈┈┈┈┈┈┈FFFFFFFFFFFFFFFFFFF┊┊┊┊┊┊┊┊┊┊┊FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF╳FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
}

// initial variable settings
{
	var layer1map = baseBlankMap;
	var layer1Cmap = baseBlankMap;
	var layer2map = baseBlankMap;
	var layer2Cmap = baseBlankMap;
	var layer3map = baseBlankMap;
	var layer3Cmap = baseBlankMap;
	var layer4map = baseBlankMap;
	var layer4Cmap = baseBlankMap;

	var layer1Coords = [];		// Uses the fileCoord System
	var layer1Types = [];			// 0 is setelment, 1 is city
	var layer1Owner = [];			// player number, 1 indexed
	var layer1Health = [];		// Health, 1 indexed
	var layer1Craft = [];			// crafts left, 1/0

	var layer2Coords = [];		// Uses the fileCoord System
	var layer2Types = [];			// 0 is setelment, 1 is city
	var layer2Owner = [];			// player number, 1 indexed
	var layer2Attacks = [];		// Health, 1 indexed
	var layer2Moves = [];			// whether it has crafted or not, 1/0

	var layer3Coords = [];		// Uses the fileCoord System
	var layer3Types = [];			// 0 is setelment, 1 is city

	var layer4Coords = [];		// Uses the fileCoord System
	var layer4Types = [];			// 0 is inf, 1 tank, 2 boat, 3 plane, 4 cargo
	var layer4Owner = [];			// player number, 1 indexed
	var layer4Attacks = [];		// Health, 1 indexed
	var layer4Moves = [];			// whether it has crafted or not, 1/0

	var onMainPage = true;
	var player0 = 0;
	var fileCoord = 1;
	var currentRow = 0;

	var xPosScreen = 1;
	var yPosScreen = 1;

	var layerSelected0 = 0;
	var mapInView = true;
	var echoMode = true;

	var arrayColors = [ "\x1b[38;5;19m", "\x1b[38;5;21m", "\x1b[38;5;227m", "\x1b[38;5;130m", "\x1b[38;5;94m", "\x1b[38;5;34m", "\x1b[38;5;237m", "\x1b[38;5;253m", "\x1b[38;5;22m", "\x1b[38;5;185m", "\x1b[38;5;8m", "\x1b[38;5;200m", "\x1b[38;5;130m", "\e[38;5;200m", "\x1b[38;5;100m", "\x1b[38;5;15m" ];
	var arrayOverlayColors = [ "\x1b[38;5;1m", "\x1b[38;5;4m", "\x1b[38;5;15m", "\x1b[38;5;202m", "\x1b[38;5;161m", "\x1b[38;5;40m", "\x1b[38;5;226m", "\x1b[38;5;230m", "\x1b[38;5;28m", "\x1b[38;5;166m", "\x1b[38;5;240m", "\x1b[38;5;40m", "\x1b[38;5;7m", "\e[38;5;200m", "\x1b[38;5;200m", "\x1b[38;5;15m" ];

	var lineLength = 120;
	var numLines = 90;
	var moveMode = false;
	var rowsToUpdate = [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ];

	var overlayRows = [];
	var mapSec = [];

	var topCut = 0;
	var botCut = 40;

	var updateCursor = true;
	var updateLayers = true;

	var bumpsLeft = [ 1, 1, 1, 1, 1, 1 ];
	var bumpsTotal = [ 1, 1, 1, 1, 1, 1 ];

	var layerVis = [ true, true, true, true ];
}

term.on('key', (key, _ev) => {
	/**
	console.log(key.charCodeAt(0) + " and " + key)
	if(echoMode === true)
	{
		if (key.charCodeAt(0) == 13)
			term.write('\n');
		term.write(key);
	}
	*/
	strInput = key;
	if(onMainPage === true)
	{
		onMainPage = false;
		mainPageInput();
		beforeInput();
		onMainPage = true;
	}
});

function clearLine()
{
	term.write("\x1b[2K");
}

function beforeInput()
{
	noColor();
	moveCursor(0, 42);
	term.writeln("\r\x1b[2KXPosScreen:  " + xPosScreen + "    YPosScreen:  " + yPosScreen + "    FileCoord:  " + fileCoord + "    TopCut:  " + topCut + "     BotCut:  " + botCut );

	moveCursor(xPosScreen, yPosScreen);
	term.write("\x1b[0m");
	term.write("+");
	updateHud();

	moveCursor(119, 50);
	noColor();
}

function noColor()
{
	term.write("\x1b[38;5;15m");
}

function updateHud()
{
	var typesArray1 = [ "Settelment", "City" ];
	var typesArray2 = [ "Infantry", "Tank", "Boat", "Plane", "Cargo", "Nuke" ];
	var typesArray3 = [ "Wheat", "Wool", "Wood", "Bricks", "Iron", "Uranium", "Graphene" ];
	var typesArray4 = [ "Infantry", "Tank", "Boat", "Plane", "Cargo", "Nuke" ];

	noColor();
	moveCursor(0, 43);
	term.write(hudString);
	noColor();
	moveCursor(4, 46);
	term.write("      ");
	moveCursor( ( 4 + player0 ), 46);
	term.write("^");
	moveCursor(4, 48);
	term.write(bumpsLeft[player0]);
	moveCursor(8, 48);
	term.write(bumpsTotal[player0]);

	moveCursor(15, 45);
	term.write("        ");
	moveCursor(15, 45);
	var i;
	for(i = 0; i <= 3; i++)
	{
		if( layerVis[i] === true )
		{
			term.write("* ");
		}
		else
		{
			term.write("  ");
		}
	}
	moveCursor(15, 47);
	term.write("        ");
	moveCursor(15, 47);
	var i;
	for(i = 0; i <= 3; i++)
	{
		if( i === layerSelected0 )
		{
			term.write("^");
			break
		}
		else
		{
			term.write("  ");
		}
	}

	if ( moveMode === true )
	{
		moveCursor(26, 46);
		term.write("Moving Object");
	}
	else if( ( layerVis[3] === true ) && layer4Coords.includes(fileCoord) )
	{
		moveCursor(26, 46);
		var currentCoordIndex = layer4Coords.indexOf(fileCoord);
		var currentType = layer4Types[currentCoordIndex];
		term.write(typesArray4[currentType]);
		moveCursor(40, 46);
		term.write("P: " + ( layer4Owner[currentCoordIndex] + 1 ));
		moveCursor(37, 47);
		term.write("C: " + fileCoord);
		moveCursor(26, 47);
		term.write("Moves: " + layer4Moves[currentCoordIndex]);
		moveCursor(26, 48);
		term.write("Attacks: " + layer4Attacks[currentCoordIndex]);
	}
	else if( ( layerVis[2] === true ) && layer3Coords.includes(fileCoord) )
	{
		moveCursor(26, 46);
		var currentCoordIndex = layer3Coords.indexOf(fileCoord);

		var currentType = layer3Types[currentCoordIndex];
		term.write(typesArray3[currentType]);
		moveCursor(37, 46);
		term.write("C: " + fileCoord);
	}
	else if( ( layerVis[1] === true ) && layer2Coords.includes(fileCoord) )
	{
		moveCursor(26, 46);
		var currentCoordIndex = layer2Coords.indexOf(fileCoord);
		var currentType = layer2Types[currentCoordIndex];
		term.write(typesArray2[currentType]);
		moveCursor(40, 46);
		term.write("P: " + ( layer2Owner[currentCoordIndex] + 1 ) );
		moveCursor(37, 47);
		term.write("C: " + fileCoord);
		moveCursor(26, 47);
		term.write("Moves: " + layer2Moves[currentCoordIndex]);
		moveCursor(26, 48);
		term.write("Attacks: " + layer2Attacks[currentCoordIndex]);
	}
	else if( ( layerVis[0] === true ) && layer1Coords.includes(fileCoord) )
	{
		moveCursor(26, 46);
		var currentCoordIndex = layer1Coords.indexOf(fileCoord);
		var currentType = layer1Types[currentCoordIndex];
		term.write(typesArray1[currentType]);
		moveCursor(40, 46);
		term.write("P: " + ( layer1Owner[currentCoordIndex] + 1 ));
		moveCursor(37, 47);
		term.write("C: " + fileCoord );
		moveCursor(26, 47);
		term.write("HP: " + layer1Health[currentCoordIndex]);
		if ( currentType === 1 )
		{
			moveCursor(26, 48);
			term.write("Crafts: " + layer1Craft[currentCoordIndex]);
		}
	}
}

function shuffle(a)
{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--)
	{
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function printColoredMap(map, color)
{
	var space;
	var outString = "\x1b[38;5;15m";
	outString += "\x1b[1m";
	var i;
	for(i = ( topCut * lineLength ); i <= ( botCut * lineLength ); i++ )
	{
		space = map.charAt(i);
		if( space === "╳" )
		{
			outString += "\r\n";
		}
		else if( space === " " )
		{
			outString += " ";
		}
		else
		{
			outString += arrayColors[parseInt(color.charAt(i), 16)];
			outString += space;
			outString += "\x1b[38;5;15m";
		}
	}
	return outString;
}

function generateMap()
{
	var arrayTopRow1 = [ " i i /| ,  ", "           ", "    q      ", "           ", "           ", " ', /\\     ", " ', /\\  /\\ ", "~\`    \` '  ", "  ,    -,  " ];
	var arrayTopRow2 = [ " i i /| ,  , ", "   __        ", "   t   t   T ", " __          ", "  /\\ /\\      ", "   .     /\\  ", "   .       --", "     \` '  ~  ", "  -  -       " ];
	var arrayTopRow3 = [ " i i /| ,  ,  ,", "  ,'  '. __   ,", " t     p  t    ", "-' ,'\\__     _'", "\`\\/, /  \\  /\\  ", " /\\  \\ /\\      ", " /\\  \\  /\\ /   ", "   ' ~       ~ ", "   ,    ,   -  " ];
	var arrayTopRow4 = [ " i i /| ,  ,  ,  ", ".-'  _  ,'  \\_/  ", "     T     P     ", " .       '.__' , ", "  \`\\ / .  \\/  \\  ", "     _'__    /\\  ", "     _'__  ,  /\\ ", " \`        '      ", ",       _  p     " ];

	var arrayBotRow1 = [ "i i /| ,  ,  ,  ,", "  .'   '.     \\  ", "   P    T     t  ", "   .-.  *        ", " ,  /   \`  \\ , \\ ", " /\\ /    \\/-     ", " /\\ /    \\/\\     ", "   ~   ~      ~  ", "   -   '_'.-. T  " ];
	var arrayBotRow2 = [ "i /| ,  ,  ,  ,", "' ,,'   '. ',,'", " |  T     t    ", "  '-'  .-.  *  ", "  / /\\   . \\   ", "   \\  *   / /\\ ", "   \\  *   / /\\ ", "   \`       \`   ", " ,     | '~'  ," ];
	var arrayBotRow3 = [ "/| ,  ,  ,  ,", ".,  ,,'  \\_  ", "      t  p  |", ". ____'-'    ", "/ /  \\/\\   \\ ", "   \\_,--'    ", "   \\_,--'    ", "~ \`   \` '    ", "   ,    -  T " ];
	var arrayBotRow4 = [ " ,  ,  ,  ,", " '-.  ',, '", " T  q   t  ", " HHHH  ,.  ", "/  .  ,\\   ", " /\\     /\\ ", " /\\     /\\ ", "    ~    ~ ", "   -   ,   " ];

	var arrayTopColor1 = [ "F2F2F44F3FF", "FFF5FFFFFFF", "FFFF8FFFFFF", "FFFFCFFFFFF", "FFFFAFFFFFF", "F01FEEFFFFF", "F10FEEFFEEF", "00FFFF1F0FF", "FF9FFFF99FF" ];
	var arrayTopColor2 = [ "F2F2F44F3FF3F", "FFF55FFFFFFFF", "FFF8FFF8FFF8F", "FCCFFFFFFFFFF", "FFAAFAAFFFFFF", "FFF1FFFFFEEFF", "FFF1FFFFFFF00", "FFFFF1F1FF0FF", "FF9FF9FFFFFFF" ];
	var arrayTopColor3 = [ "F2F2F44F3FF3FF3", "FF55FF55F55FFF5", "F8FFFFF8FF8FFFF", "CCFCCCCCFFFFFCC", "AAAAFAFFAFFAAFF", "FEEFF0FEEFEFFFF", "FEEFF1FFEEF1FFF", "FFF1F1FFFFFFF1F", "FFF9FFFF9FFF9FF" ];
	var arrayTopColor4 = [ "F2F2F44F3FF3FF3FF", "555FF5FF55FF555FF", "FFFFF8FFFFF8FFFFF", "FCFFFFFFFCCCCCFCF", "FFAAFAFAFFAAFFAFF", "FFFFF1101FEFFEEFF", "FFFFF1001FF1FFEEF", "F0FFFFFFFF0FFFFFF", "9FFFFFFF8FF8FFFFF" ];

	var arrayBotColor1 = [ "2F2F44F3FF3FF3FF3", "FF55FFF55FFFFF5FF", "FFF8FFFF8FFFFF8FF", "FFFCCCFFCFFFFFFFF", "FAFFAFFFAFFAFAFAF", "FEEF0FFFF001FFFFF", "FEEF1FFFF001FFFFF", "FFF1FFF1FFFFFF1FF", "FFF9FFF888011F8FF" ];
	var arrayBotColor2 = [ "2F44F3FF3FF3FF3", "5F776FFF55F6775", "F8FF8FFFFF8FFFF", "FFCCCFFCCCFFCFF", "FFAFAAFFFAFAFFF", "FFF0FF0FFF0FEEF", "FFF1FF1FFF1FEEF", "FFF0FFFFFFF0FFF", "F9FFFFF3F001FF9" ];
	var arrayBotColor3 = [ "44F3FF3FF3FF3", "55FF776FF55FF", "FFFFFF8FF8FF8", "CFCCCCCCCFFFF", "AFAFFAAAFFFAF", "FFF011001FFFF", "FFF110011FFFF", "1F1FFF1F0FFFF", "FFF9FFFF9FF8F" ];
	var arrayBotColor4 = [ "F3FF3FF3FF3", "F555FF677F5", "F8FF8FFF8FF", "FCCCCFFCCFF", "AFFAFFAAFFF", "FEEFFFFFEEF", "FEEFFFFFEEF", "FFFF0FFFF1F", "FFF9FFF9FFF" ];

	var arrayTilesTotal = [ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9 ];

	var arrayOfTopChars = [ "3", "5", "7", "9", "A", "B", "C", "D", "E", "╬", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "~", "!", "#", "%", "&", "(", "+", "{", "[", "|", ":", "<", ".", "?", "━", "┃", "┅", "┇", "┉"];
	var arrayOfBotChars = [ "4", "6", "8", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "\`", "@", "$", "^", "*", ")", "=", "}", "]", "_", ";", ">", ",", "─", "│", "┄", "┆", "┈", "┊"];

	var arrayTilesDeck = shuffle(arrayTilesTotal);

	var i;
	var searchChar;
	var currentTile;
	var findString;
	var replaceString;
	for(i = 0; i <= 48; i++)
	{
		searchChar = arrayOfTopChars[i];
		currentTile = ( arrayTilesDeck[i] - 1 );

		findString = searchChar.repeat(17);
		replaceString = arrayTopRow4[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayTopColor4[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);

		findString = searchChar.repeat(15);
		replaceString = arrayTopRow3[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayTopColor3[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);

		findString = searchChar.repeat(13);
		replaceString = arrayTopRow2[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayTopColor2[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);

		findString = searchChar.repeat(11);
		replaceString = arrayTopRow1[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayTopColor1[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);


		searchChar = arrayOfBotChars[i];

		findString = searchChar.repeat(17);
		replaceString = arrayBotRow1[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayBotColor1[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);

		findString = searchChar.repeat(15);
		replaceString = arrayBotRow2[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayBotColor2[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);

		findString = searchChar.repeat(13);
		replaceString = arrayBotRow3[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayBotColor3[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);

		findString = searchChar.repeat(11);
		replaceString = arrayBotRow4[currentTile];
		genWorkMap = genWorkMap.replace(findString, replaceString);
		replaceString = arrayBotColor4[currentTile];
		genColorWork = genColorWork.replace(findString, replaceString);
	}

	var k;
	for(k = 50; k >= 0; k -= 10)
	{
		topCut = k;
		botCut = ( k + 40 );
		mapSec[k / 10] = printColoredMap(genWorkMap, genColorWork);
	}
}

function cls()
{
	term.clear();
}

function moveCursor(col, row)
{
	term.write("\x1b[" + row + ";" + col + "H");
}

function getIntInput(strPrompt, strDefault)
{
	intInput = parseInt( prompt(strPrompt, strDefault), );
	return intInput;
}

function mainPageInput()
{
	var input = strInput;
	clearLine();
	moveCursor(1, 50);

	if( ( input === "w" ) && ( yPosScreen != 1 ) )
	{
		currentRow--;
		removeCursor();
		fileCoord = ( fileCoord - lineLength );
		yPosScreen--;
	}
	else if( ( input === "s" ) && ( yPosScreen != 40 ) )
	{
		currentRow++;
		removeCursor();
		fileCoord = ( fileCoord + lineLength );
		yPosScreen++;
	}
	else if( ( input === "a" ) && ( xPosScreen != 1 ) )
	{
		removeCursor();
		fileCoord--;
		xPosScreen--;
	}
	else if( ( input === "d" ) && ( xPosScreen != 119 ) )
	{
		removeCursor();
		fileCoord++;
		xPosScreen++;
	}
	else if( ( input === "w" ) && ( yPosScreen === 1 ) && ( topCut != 0 ) )
	{
		currentRow = ( currentRow - 10 );
		fileCoord = ( fileCoord - 1200 );
		topCut = ( topCut - 10 );
		botCut = ( botCut - 10 );
		updateMapLayer();
	}
	else if( ( input === "s" ) && ( yPosScreen === 40 ) && ( botCut != 90 ) )
	{
		currentRow = ( currentRow + 10 );
		fileCoord = ( fileCoord + 1200 );
		topCut = ( topCut + 10 );
		botCut = ( botCut + 10 );
		updateMapLayer();
	}
	else if( ( input === "r" ) && ( topCut != 0 ) )
	{
		currentRow = ( currentRow - 10 );
		fileCoord = ( fileCoord - 1200 );
		topCut = ( topCut - 10 );
		botCut = ( botCut - 10 );
		updateMapLayer();
	}
	else if( ( input === "f" ) && ( botCut != 90 ) )
	{
		currentRow = ( currentRow + 10 );
		fileCoord = ( fileCoord + 1200 );
		topCut = ( topCut + 10 );
		botCut = ( botCut + 10 );
		updateMapLayer();
	}
	else if( input === "`" )
	{
		cls();
		updateMapLayer();
	}
	else if( input === "z" )
	{
		if( layerSelected0 === 0 )
		{
			layerSelected0 = 3;
		}
		else
		{
			layerSelected0--;
		}
	}
	else if( input === "x" )
	{
		if( layerSelected0 === 3 )
		{
			layerSelected0 = 0;
		}
		else
		{
			layerSelected0++;
		}
	}
	else if( input === "c" )
	{
		if( layerVis[layerSelected0] === false )
		{
			layerVis[layerSelected0] = true;
		}
		else
		{
			layerVis[layerSelected0] = false;
		}
		updateMapLayer();
	}
	else if( ( input === "e" ) && ( moveMode === false ) )
	{
		if( ( layerSelected0 === 0 ) && ( layerVis[layerSelected0] === true ) )
		{
			intInput = getIntInput("1: Settlement,  2: City", "Enter Here");
			clearLine();
			if( ( intInput === 1 ) || ( intInput === 2 ) )
			{
				addItem(1, intInput - 1, player0);
				drawItem(1, intInput - 1, player0);
			}
			else
			{
				term.write("\rInvalid Input.");
			}
		}
		else if( ( layerSelected0 === 1 ) && ( layerVis[layerSelected0] === true ) )
		{
			intInput = getIntInput("1: Infantry,  2: Tank,  3: Boat,  4: Plane,  5: Cargo,  6: Nuke", "Enter Here");
			clearLine();

			if( ( intInput >= 1 ) && ( intInput <= 6 ) )
			{
				addItem(2, intInput - 1, player0);
				drawItem(2, intInput - 1, player0);
			}
			else
			{
				term.write("\rInvalid Input.");
			}
		}
		else if( ( layerSelected0 === 2 ) && ( layerVis[layerSelected0] === true ) )
		{
			intInput = getIntInput("1: Wheat,  2: Sheep,  3: Wood,  4: Bricks,  5: Iron,  6: Uranium,  7: Graphene", "Enter Here");
			clearLine();

			if( ( intInput >= 1 ) && ( intInput <= 7 ) )
			{
				addItem(3, 0, intInput - 1);
				drawItem(3, 0, intInput - 1);
				// I don't care about type (2)
			}
			else
			{
				term.write("\rInvalid Input.");
			}
		}
		else if ( ( layerSelected0 === 3 ) && ( layerVis[layerSelected0] === true ) )
		{
			intInput = getIntInput("1: Infantry,  2: Tank,  3: Boat,  4: Plane,  5: Cargo,  6: Nuke", "Enter Here");
			clearLine();

			if( ( intInput >= 1 ) && ( intInput <= 6 ) )
			{
				addItem(4, intInput - 1, player0);
				drawItem(4, intInput - 1, player0);
			}
			else
			{
				term.write("\rInvalid Input.");
			}
		}
		else
		{
			term.write("\rLayer Hidden or Too Close to Edge");
		}
	}
}

function getLine(string, startIndex)
{
	var tokens = string.split("╳").slice(startIndex);
	var split1 = tokens.join("╳");
	return split1.substring(0, lineLength);
}

function overlayLine(line)
{
	// Prints the map given in color
	// 1: Line number
	var layer1 = false;
	var layer2 = false;
	var layer3 = false;
	var layer4 = false;

	if( layerVis[0] === true )
	{
		var lineWorkMap1 = getLine(layer1map, line);
		var lineWorkColor1 = getLine(layer1Cmap, line);
		layer1 = true;
	}

	if( layerVis[1] === true )
	{
		var lineWorkMap2 = getLine(layer2map, line);
		var lineWorkColor2 = getLine(layer2Cmap, line);
		layer2 = true;
	}

	if( layerVis[2] === true )
	{
		var lineWorkMap3 = getLine(layer3map, line);
		var lineWorkColor3 = getLine(layer3Cmap, line);
		layer3 = true;
	}

	if ( layerVis[3] === true )
	{
		var lineWorkMap4 = getLine(layer4map, line);
		var lineWorkColor4 = getLine(layer4Cmap, line);
		layer4 = true;
	}

	var outString = "";

	var space1;
	var space2;
	var space3;
	var space4;
	var i;
	for(i = 0; i <= ( lineLength - 2 ); i++)
	{
		if(layer1)
		{
			space1 = lineWorkMap1.charAt(i);
		}
		if(layer2)
		{
			space2 = lineWorkMap2.charAt(i);
		}
		if(layer3)
		{
			space3 = lineWorkMap3.charAt(i);
		}
		if(layer4)
		{
			space4 = lineWorkMap4.charAt(i);
		}

		if( layer4 && ( space4 != " " ) )
		{
			outString += arrayOverlayColors[parseInt(lineWorkColor4.charAt(i), 16)];
			outString += space4;
		}
		else if( layer3 && ( space3 != " " ) )
		{
			outString += arrayOverlayColors[parseInt(lineWorkColor3.charAt(i), 16)];
			outString += space3;
		}
		else if( layer2 && ( space2 != " " ) )
		{
			outString += arrayOverlayColors[parseInt(lineWorkColor2.charAt(i), 16)];
			outString += space2;
		}
		else if( layer1 && ( space1 != " " ) )
		{
			outString += arrayOverlayColors[parseInt(lineWorkColor1.charAt(i), 16)];
			outString += space1;
		}
		else
		{
			outString += "\x1b[1C";
		}
	}
	return outString;
}

function removeCursor()
{
	if( layerVis[0] === true )
	{
		var fileWorkLayer1 = layer1map;
		var fileWorkLayerC1 = layer1Cmap;
		var space1 = fileWorkLayer1.charAt(fileCoord - 1);
	}

	if( layerVis[1] === true )
	{
		var fileWorkLayer2 = layer2map;
		var fileWorkLayerC2 = layer2Cmap;
		var space2 = fileWorkLayer2.charAt(fileCoord - 1);
	}

	if( layerVis[2] === true )
	{
		var fileWorkLayer3 = layer3map;4
		var fileWorkLayerC3 = layer3Cmap;
		var space3 = fileWorkLayer3.charAt(fileCoord - 1);
	}

	if ( layerVis[3] === true )
	{
		var fileWorkLayer4 = layer4map;
		var fileWorkLayerC4 = layer4Cmap;
		var space4 = fileWorkLayer4.charAt(fileCoord - 1);
	}

	if( mapInView === true )
	{
		var fileWorkMap1 = genWorkMap;
		var fileWorkColor1 = genColorWork;
		var spaceMap = fileWorkMap1.charAt(fileCoord - 1);
	}

	moveCursor(xPosScreen, yPosScreen);
	term.write("\x1b[1m");

	if( ( space4 != " " ) && ( space4 != "╳" ) && ( layerVis[3] === true ) )
	{
		term.write(arrayOverlayColors[parseInt(fileWorkLayerC4.charAt(fileCoord - 1), 16)]);
		term.write(space4);
	}
	else if( ( space3 != " " ) && ( space3 != "╳" ) && ( layerVis[2] === true ) )
	{
		term.write(arrayOverlayColors[parseInt(fileWorkLayerC3.charAt(fileCoord - 1), 16)]);
		term.write(space3);
	}
	else if( ( space2 != " " ) && ( space2 != "╳" ) && ( layerVis[1] === true ) )
	{
		term.write(arrayOverlayColors[parseInt(fileWorkLayerC2.charAt(fileCoord - 1), 16)]);
		term.write(space2);
	}
	else if( ( space1 != " " ) && ( space1 != "╳" ) && ( layerVis[0] === true ) )
	{
		term.write(arrayOverlayColors[parseInt(fileWorkLayerC1.charAt(fileCoord - 1), 16)]);
		term.write(space1);
	}
	else if( ( spaceMap != " " ) && ( spaceMap != "╳" ) && ( mapInView === true ) )
	{
		term.write(arrayColors[parseInt(fileWorkColor1.charAt(fileCoord - 1), 16)]);
		term.write(spaceMap);
	}
	else
	{
		term.write(" ");
	}
	term.write("\x1b[0m");
	moveCursor(0, 50);
}

function updateMapLayer()
{
	moveCursor(0, 0);
	echoMode = false;
	if( mapInView === true )
	{
		term.writeln(mapSec[topCut / 10]);
	}
	else
	{
		//cat "$ramDiskDir/blank.map"
	}

	var l;
	for(l = 0; l <= 90; l++)
	{
		if( rowsToUpdate[l] === true )
		{
			overlayRows[l] = overlayLine(l);
			rowsToUpdate[l] = false;
		}
	}

	moveCursor(0, 0);
	var i;
	for(i = topCut; i <= botCut; i++)
	{
		term.writeln(overlayRows[i]);
	}
}

function addItem(layer, item, color)
{
	var placeCoord = (fileCoord - 1);
	// addItem
	// 1: Layer
	// 2: Item Number
	// 3: Color

	if( ( item === 1 ) && ( layer === 1 ) )
	{
		// add city
		layer1Coords.push(fileCoord);
		layer1Types.push(item);
		layer1Owner.push(player0);
		layer1Health.push(3);
		layer1Craft.push(1);
		bumpsTotal[player0]++;
		bumpsLeft[player0]++;
	}
	if( ( item === 0 ) && ( layer === 1 ) )
	{
		// add settlement
		layer1Coords.push(fileCoord);
		layer1Types.push(item);		// city
		layer1Owner.push(player0);
		layer1Health.push(3);
		layer1Craft.push(0);
	}
	if( ( item === 0 ) && ( layer === 2 ) )
	{
		// add inf
		layer2Coords.push(fileCoord);
		layer2Types.push(item);
		layer2Owner.push(player0);
		layer2Attacks.push(1);
		layer2Moves.push(1);
	}
	if( ( item === 1 ) && ( layer === 2 ) )
	{
		// add tank
		layer2Coords.push(fileCoord);
		layer2Types.push(item);
		layer2Owner.push(player0);
		layer2Attacks.push(1);
		layer2Moves.push(1);
	}
	if( ( item === 2 ) && ( layer === 2 ) )
	{
		// add boat
		layer2Coords.push(fileCoord);
		layer2Types.push(item);
		layer2Owner.push(player0);
		layer2Attacks.push(1);
		layer2Moves.push(1);
	}
	if( ( item === 3 ) && ( layer === 2 ) )
	{
		// add plane
		layer2Coords.push(fileCoord);
		layer2Types.push(item);
		layer2Owner.push(player0);
		layer2Attacks.push(1);
		layer2Moves.push(1);
	}
	if( ( item === 4 ) && ( layer === 2 ) )
	{
		// add cargo
		layer2Coords.push(fileCoord);
		layer2Types.push(item);
		layer2Owner.push(player0);
		layer2Attacks.push(1);
		layer2Moves.push(1);
	}

	if( layer === 3 )
	{
		layer3Coords.push(fileCoord);
		layer3Types.push(color);
	}

	if( ( item === 0 ) && ( layer === 4 ) )
	{
		// add inf
		layer4Coords.push(fileCoord);
		layer4Types.push(item);
		layer4Owner.push(player0);
		layer4Attacks.push(1);
		layer4Moves.push(1);
	}
	if( ( item === 1 ) && ( "$1" === 4 ) )
	{
		// add tank
		layer4Coords.push(fileCoord);
		layer4Types.push(item);
		layer4Owner.push(player0);
		layer4Attacks.push(1);
		layer4Moves.push(1);
	}
	if( ( item === 2 ) && ( layer === 4 ) )
	{
		// add boat
		layer4Coords.push(fileCoord);
		layer4Types.push(item);
		layer4Owner.push(player0);
		layer4Attacks.push(1);
		layer4Moves.push(1);
	}
	if( ( item === 3 ) && ( layer === 4 ) )
	{
		// add plane
		layer4Coords.push(fileCoord);
		layer4Types.push(item);
		layer4Owner.push(player0);
		layer4Attacks.push(1);
		layer4Moves.push(1);
	}
	if( ( item === 4 ) && ( layer === 4 ) )
	{
		// add cargo
		layer4Coords.push(fileCoord);
		layer4Types.push(item);
		layer4Owner.push(player0);
		layer4Attacks.push(1);
		layer4Moves.push(1);
	}
}

function drawItem(layer, item, colorInput)
{
	var placeCoord = (fileCoord - 1);

	// addItem
 	// 1: Layer
	// 2: Item Number
	// 3: Color

	rowsToUpdate[currentRow] = true;
	if ( currentRow != 0 )
		rowsToUpdate[currentRow - 1] = true;

	if( ( item === 1 ) && ( layer === 1 ) )
	{
		// add city
		layer1map = layer1map.replaceAt(placeCoord, "█");
		layer1map = layer1map.replaceAt(placeCoord - 1, "█");
		layer1map = layer1map.replaceAt(placeCoord + 1, "▄");
		layer1map = layer1map.replaceAt(placeCoord + 2, "▄");
		layer1map = layer1map.replaceAt(placeCoord - lineLength, "\\");
		layer1map = layer1map.replaceAt(placeCoord - lineLength - 1, "/");

		layer1Cmap = layer1Cmap.replaceAt(placeCoord, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord - 1, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord + 2, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord - lineLength, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord - lineLength - 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 0 ) && ( layer === 1 ) )
	{
		// add settlement
		layer1map = layer1map.replaceAt(placeCoord, "█");
		layer1map = layer1map.replaceAt(placeCoord - 1, "█");
		layer1map = layer1map.replaceAt(placeCoord - lineLength, "\\");
		layer1map = layer1map.replaceAt(placeCoord - lineLength - 1, "/");

		layer1Cmap = layer1Cmap.replaceAt(placeCoord, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord - 1, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord - lineLength, colorInput.toString());
		layer1Cmap = layer1Cmap.replaceAt(placeCoord - lineLength - 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 0 ) && ( layer === 2 ) )
	{
		// add inf
		layer2map = layer2map.replaceAt(placeCoord, "-");
		layer2map = layer2map.replaceAt(placeCoord + 1, ">");

		layer2Cmap = layer2Cmap.replaceAt(placeCoord, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord + 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 1 ) && ( layer === 2 ) )
	{
		// add tank
		layer2map = layer2map.replaceAt(placeCoord, ">");
		layer2map = layer2map.replaceAt(placeCoord + 1, ">");
		layer2map = layer2map.replaceAt(placeCoord - 1, ">");

		layer2Cmap = layer2Cmap.replaceAt(placeCoord, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 2 ) && ( layer === 2 ) )
	{
		// add boat
		layer2map = layer2map.replaceAt(placeCoord, "_");
		layer2map = layer2map.replaceAt(placeCoord - 1, "_");
		layer2map = layer2map.replaceAt(placeCoord + 1, "/");
		layer2map = layer2map.replaceAt(placeCoord - 2, "\\");

		layer2map = layer2map.replaceAt(placeCoord - lineLength, "\\");
		layer2map = layer2map.replaceAt(placeCoord - lineLength - 1, "⎦");
		layer2map = layer2map.replaceAt(placeCoord - lineLength + 1, "_");
		layer2map = layer2map.replaceAt(placeCoord - lineLength - 2, "_");

		layer2Cmap = layer2Cmap.replaceAt(placeCoord, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - 1, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - 2, colorInput.toString());

		layer2Cmap = layer2Cmap.replaceAt(placeCoord - lineLength, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - lineLength - 1, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - lineLength + 1, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - lineLength - 2, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 3 ) && ( layer === 2 ) )
	{
		// add plane
		layer2map = layer2map.replaceAt(placeCoord, "=");
		layer2map = layer2map.replaceAt(placeCoord + 1, ">");

		layer2Cmap = layer2Cmap.replaceAt(placeCoord, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		updateMapLayer();
	}
	if( ( item === 4 ) && ( layer === 2 ) )
	{
		// add cargo
		layer2map = layer2map.replaceAt(placeCoord, "=");
		layer2map = layer2map.replaceAt(placeCoord + 1, ">");
		layer2map = layer2map.replaceAt(placeCoord - 1, ">");

		layer2Cmap = layer2Cmap.replaceAt(placeCoord, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer2Cmap = layer2Cmap.replaceAt(placeCoord - 1, colorInput.toString());

		updateMapLayer();
	}

	if( layer === 3 )
	{
		if( ( colorInput === 5 ) || ( colorInput === 6 ) )
		{
			layer3map = layer3map.replaceAt(placeCoord, "$");
		}
		else
		{
			layer3map = layer3map.replaceAt(placeCoord, "●");
		}
		layer3Cmap = layer3Cmap.replaceAt(placeCoord, (colorInput + 6).toString(16) );
	}

	if( ( item === 0 ) && ( layer === 4 ) )
	{
		// add inf
		layer4map = layer4map.replaceAt(placeCoord, "-");
		layer4map = layer4map.replaceAt(placeCoord + 1, ">");

		layer4Cmap = layer4Cmap.replaceAt(placeCoord, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord + 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 1 ) && ( layer === 4 ) )
	{
		// add tank
		layer4map = layer4map.replaceAt(placeCoord, ">");
		layer4map = layer4map.replaceAt(placeCoord + 1, ">");
		layer4map = layer4map.replaceAt(placeCoord - 1, ">");

		layer4Cmap = layer4Cmap.replaceAt(placeCoord, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 2 ) && ( layer === 4 ) )
	{
		// add boat
		layer4map = layer4map.replaceAt(placeCoord, "_");
		layer4map = layer4map.replaceAt(placeCoord - 1, "_");
		layer4map = layer4map.replaceAt(placeCoord + 1, "/");
		layer4map = layer4map.replaceAt(placeCoord - 4, "\\");

		layer4map = layer4map.replaceAt(placeCoord - lineLength, "\\");
		layer4map = layer4map.replaceAt(placeCoord - lineLength - 1, "⎦");
		layer4map = layer4map.replaceAt(placeCoord - lineLength + 1, "_");
		layer4map = layer4map.replaceAt(placeCoord - lineLength - 4, "_");

		layer4Cmap = layer4Cmap.replaceAt(placeCoord, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - 1, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - 4, colorInput.toString());

		layer4Cmap = layer4Cmap.replaceAt(placeCoord - lineLength, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - lineLength - 1, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - lineLength + 1, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - lineLength - 4, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 3 ) && ( layer === 4 ) )
	{
		// add plane
		layer4map = layer4map.replaceAt(placeCoord, "=");
		layer4map = layer4map.replaceAt(placeCoord + 1, ">");

		layer4Cmap = layer4Cmap.replaceAt(placeCoord, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord + 1, colorInput.toString());

		updateMapLayer();
	}
	if( ( item === 4 ) && ( layer === 4 ) )
	{
		// add cargo
		layer4map = layer4map.replaceAt(placeCoord, "=");
		layer4map = layer4map.replaceAt(placeCoord + 1, ">");
		layer4map = layer4map.replaceAt(placeCoord - 1, ">");

		layer4Cmap = layer4Cmap.replaceAt(placeCoord, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord + 1, colorInput.toString());
		layer4Cmap = layer4Cmap.replaceAt(placeCoord - 1, colorInput.toString());

		updateMapLayer();
	}
}

function coverItem(layer, item, removeCoord)
{
	var placeCoord = (fileCoord - 1);

	// coverItem
	// 1: Layer
	// 2: Item Number
	// 3: Remove Coord

	rowsToUpdate[currentRow] = true;
	if ( currentRow != 0 )
		rowsToUpdate[currentRow - 1] = true;

	if( ( item === 1 ) && ( layer === 1 ) )
	{
		// add city
		layer1map = layer1map.replaceAt(removeCoord, " ");
		layer1map = layer1map.replaceAt(removeCoord - 1, " ");
		layer1map = layer1map.replaceAt(removeCoord + 1, " ");
		layer1map = layer1map.replaceAt(removeCoord + 2, " ");
		layer1map = layer1map.replaceAt(removeCoord - lineLength, " ");
		layer1map = layer1map.replaceAt(removeCoord - lineLength - 1, " ");

		layer1Cmap = layer1Cmap.replaceAt(removeCoord, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord - 1, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord + 1, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord + 2, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord - lineLength, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord - lineLength - 1, " ");

		updateMapLayer();
	}
	if( ( item === 0 ) && ( layer === 1 ) )
	{
		// add settlement
		layer1map = layer1map.replaceAt(removeCoord, " ");
		layer1map = layer1map.replaceAt(removeCoord - 1, " ");
		layer1map = layer1map.replaceAt(removeCoord - lineLength, " ");
		layer1map = layer1map.replaceAt(removeCoord - lineLength - 1, " ");

		layer1Cmap = layer1Cmap.replaceAt(removeCoord, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord - 1, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord - lineLength, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord - lineLength - 1, " ");

		updateMapLayer();
	}
	if( ( item === 0 ) && ( layer === 2 ) )
	{
		// add inf
		layer2map = layer2map.replaceAt(removeCoord, " ");
		layer2map = layer2map.replaceAt(removeCoord + 1, " ");

		layer1Cmap = layer1Cmap.replaceAt(removeCoord, " ");
		layer1Cmap = layer1Cmap.replaceAt(removeCoord + 1, " ");

		updateMapLayer();
	}
	if( ( item === 1 ) && ( layer === 2 ) )
	{
		// add tank
		layer2map = layer2map.replaceAt(removeCoord, " ");
		layer2map = layer2map.replaceAt(removeCoord + 1, " ");
		layer2map = layer2map.replaceAt(removeCoord - 1, " ");

		layer2Cmap = layer2Cmap.replaceAt(removeCoord, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord + 1, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - 1, " ");

		updateMapLayer();
	}
	if( ( item === 2 ) && ( layer === 2 ) )
	{
		// add boat
		layer2map = layer2map.replaceAt(removeCoord, " ");
		layer2map = layer2map.replaceAt(removeCoord - 1, " ");
		layer2map = layer2map.replaceAt(removeCoord + 1, " ");
		layer2map = layer2map.replaceAt(removeCoord - 2, " ");

		layer2map = layer2map.replaceAt(removeCoord - lineLength, " ");
		layer2map = layer2map.replaceAt(removeCoord - lineLength - 1, " ");
		layer2map = layer2map.replaceAt(removeCoord - lineLength + 1, " ");
		layer2map = layer2map.replaceAt(removeCoord - lineLength - 2, " ");

		layer2Cmap = layer2Cmap.replaceAt(removeCoord, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - 1, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord + 1, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - 2, " ");

		layer2Cmap = layer2Cmap.replaceAt(removeCoord - lineLength, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - lineLength - 1, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - lineLength + 1, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - lineLength - 2, " ");

		updateMapLayer();
	}
	if( ( item === 3 ) && ( layer === 2 ) )
	{
		// add plane
		layer2map = layer2map.replaceAt(removeCoord, " ");
		layer2map = layer2map.replaceAt(removeCoord + 1, " ");

		layer2Cmap = layer2Cmap.replaceAt(removeCoord, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord + 1, " ");
		updateMapLayer();
	}
	if( ( item === 4 ) && ( layer === 2 ) )
	{
		// add cargo
		layer2map = layer2map.replaceAt(removeCoord, " ");
		layer2map = layer2map.replaceAt(removeCoord + 1, " ");
		layer2map = layer2map.replaceAt(removeCoord - 1, " ");

		layer2Cmap = layer2Cmap.replaceAt(removeCoord, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord + 1, " ");
		layer2Cmap = layer2Cmap.replaceAt(removeCoord - 1, " ");

		updateMapLayer();
	}

	if( layer === 3 )
	{
		layer3map = layer3map.replaceAt(removeCoord, " ");
		layer3Cmap = layer3Cmap.replaceAt(removeCoord, " " );
	}

	if( ( item = 0 ) && ( layer === 4 ) )
	{
		// add inf
		layer4map = layer4map.replaceAt(removeCoord, " ");
		layer4map = layer4map.replaceAt(removeCoord + 1, " ");

		layer4Cmap = layer4Cmap.replaceAt(removeCoord, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord + 1, " ");

		updateMapLayer();
	}
	if( ( item === 1 ) && ( layer === 4 ) )
	{
		// add tank
		layer4map = layer4map.replaceAt(removeCoord, " ");
		layer4map = layer4map.replaceAt(removeCoord + 1, " ");
		layer4map = layer4map.replaceAt(removeCoord - 1, " ");

		layer4Cmap = layer4Cmap.replaceAt(removeCoord, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord + 1, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - 1, " ");

		updateMapLayer();
	}
	if( ( item === 2 ) && ( layer === 4 ) )
	{
		// add boat
		layer4map = layer4map.replaceAt(removeCoord, " ");
		layer4map = layer4map.replaceAt(removeCoord - 1, " ");
		layer4map = layer4map.replaceAt(removeCoord + 1, " ");
		layer4map = layer4map.replaceAt(removeCoord - 4, " ");

		layer4map = layer4map.replaceAt(removeCoord - lineLength, " ");
		layer4map = layer4map.replaceAt(removeCoord - lineLength - 1, " ");
		layer4map = layer4map.replaceAt(removeCoord - lineLength + 1, " ");
		layer4map = layer4map.replaceAt(removeCoord - lineLength - 4, " ");

		layer4Cmap = layer4Cmap.replaceAt(removeCoord, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - 1, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord + 1, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - 4, " ");

		layer4Cmap = layer4Cmap.replaceAt(removeCoord - lineLength, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - lineLength - 1, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - lineLength + 1, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - lineLength - 4, " ");

		updateMapLayer();
	}
	if( ( item === 3 ) && ( layer === 4 ) )
	{
		// add plane
		layer4map = layer4map.replaceAt(removeCoord, " ");
		layer4map = layer4map.replaceAt(removeCoord + 1, " ");

		layer4Cmap = layer4Cmap.replaceAt(removeCoord, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord + 1, " ");

		updateMapLayer();
	}
	if( ( item === 4 ) && ( layer === 4 ) )
	{
		// add cargo
		layer4map = layer4map.replaceAt(removeCoord, " ");
		layer4map = layer4map.replaceAt(removeCoord + 1, " ");
		layer4map = layer4map.replaceAt(removeCoord - 1, " ");

		layer4Cmap = layer4Cmap.replaceAt(removeCoord, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord + 1, " ");
		layer4Cmap = layer4Cmap.replaceAt(removeCoord - 1, " ");

		updateMapLayer();
	}
}

String.prototype.replaceAt=function(index, replacement)
{
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}





function main()
{
	//var element = document.getElementById("startButton");
	//element.parentNode.removeChild(element);

	generateMap();
	cls();
	updateMapLayer();
	beforeInput();
}
