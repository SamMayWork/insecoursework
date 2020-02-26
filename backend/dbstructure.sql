DROP DATABASE forumbackend;
CREATE DATABASE forumbackend;

CREATE TABLE IF NOT EXISTS Users (
  user_id varchar(8) PRIMARY KEY,
  user_email varchar(100) NOT NULL,
  user_dateofregistration date NOT NULL
);

CREATE TABLE IF NOT EXISTS Board (
  board_id varchar(8) PRIMARY KEY,
  board_module TEXT NOT NULL,
  board_year varchar(9) NOT NULL
);

CREATE TABLE IF NOT EXISTS Posts (
  post_id varchar (8) PRIMARY KEY,
  keyword_id varchar(8) REFERENCES Keywords(keyword_id),
  post_title varchar (50) NOT NULL,
  post_content TEXT NOT NULL,
  post_likes SMALLINT NOT NULL,
  user_id varchar(8) not null REFERENCES Users(user_id),
  created_date date NOT NULL,
  edited_date date
);

CREATE TABLE IF NOT EXISTS Comments (
  comment_id varchar(8) PRIMARY KEY,
  comment_content TEXT NOT NULL,
  comment_likes SMALLINT NOT NULL,
  user_id varchar(8) NOT NULL REFERENCES Users(user_id),
  post_id varchar(8) NOT NULL REFERENCES Posts(post_id),
  reply_id varchar(8) REFERENCES Comments(comment_id)
);

CREATE TABLE IF NOT EXISTS Reports_Posts (
  user_id varchar (8) NOT NULL REFERENCES Users(user_id),
  post_id varchar (8) NOT NULL REFERENCES Posts(post_id),
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS Reports_Comments (
  user_id varchar (8) NOT NULL REFERENCES Users(user_id),
  comment_id varchar (8) NOT NULL REFERENCES Comments(comment_id),
  PRIMARY KEY (user_id, comment_id)
);

CREATE TABLE IF NOT EXISTS Keywords (
  keyword_id varchar(8) PRIMARY KEY,
  keyword_1 varchar(30) NOT NULL,
  keyword_2 varchar(30),
  keyword_3 varchar(30),
  keyword_4 varchar(30),
  keyword_5 varchar(30)
);

CREATE TABLE IF NOT EXISTS Notifications (
  user_id varchar (8) NOT NULL REFERENCES Users(user_id),
  notif_global Boolean NOT NULL,
  notif_new_comment Boolean NOT NULL,
  notif_activity Boolean NOT NULL,
  notif_delete Boolean NOT NULL
);

insert into Users (user_id, user_email, user_dateofregistration) values ('a2367eab', 'sbaldock0@hostgator.com', '8/9/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('75b6d7e5', 'jgallelli1@weibo.com', '5/30/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('100bad41', 'rdellow2@storify.com', '4/27/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('1901eddf', 'jdaniellot3@ezinearticles.com', '5/9/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('f217baa2', 'sgoford4@mtv.com', '1/20/2020');
insert into Users (user_id, user_email, user_dateofregistration) values ('6071154c', 'eallso5@ask.com', '7/26/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('03a3f1a2', 'stomlin6@wikia.com', '1/2/2020');
insert into Users (user_id, user_email, user_dateofregistration) values ('ca77860f', 'jmusker7@nymag.com', '4/3/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('966abbd2', 'tfirbank8@rediff.com', '12/15/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('1d0cf14b', 'bfateley9@dion.ne.jp', '7/15/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('df3a26cf', 'dlaintona@cbslocal.com', '8/29/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('bb872b73', 'rrosenkrantzb@yale.edu', '6/15/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('8aa4a403', 'mzanassic@discuz.net', '1/8/2020');
insert into Users (user_id, user_email, user_dateofregistration) values ('9aeb1116', 'umoaksond@msu.edu', '9/14/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('acc45ba4', 'doverale@wordpress.org', '4/26/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('168bca94', 'osibbef@japanpost.jp', '8/10/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('aa0f009d', 'egrattageg@salon.com', '11/23/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('82c9aefd', 'glillywhiteh@cnbc.com', '2/12/2020');
insert into Users (user_id, user_email, user_dateofregistration) values ('a91b934a', 'sducketti@51.la', '4/21/2019');
insert into Users (user_id, user_email, user_dateofregistration) values ('800447a8', 'ncotgrovej@dot.gov', '3/13/2019');

insert into Board (board_id, board_module, board_year) values ('bf35c787', 'Introduction to Hong Kong SAR China', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('cfd5636c', 'Introduction to Sierra Leone', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('9ebe60da', 'Introduction to Netherlands', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('ea27b6e3', 'Introduction to Cameroon', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('d7227788', 'Introduction to India', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('43196bcc', 'Introduction to Namibia', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('330a35aa', 'Introduction to Luxembourg', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('5a6744cd', 'Introduction to Trinidad & Tobago', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('8d3842d0', 'Introduction to St. Vincent & Grenadines', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('3086f4f2', 'Introduction to French Polynesia', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('19591864', 'Introduction to St. Vincent & Grenadines', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('0c564d65', 'Introduction to South Georgia & South Sandwich Islands', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('7c3263e6', 'Introduction to Egypt', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('570050ab', 'Introduction to British Virgin Islands', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('28d0d2db', 'Introduction to Liechtenstein', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('ac94085c', 'Introduction to St. Helena', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('656a53af', 'Introduction to Armenia', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('3092f425', 'Introduction to Rwanda', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('3f9b6b51', 'Introduction to Liechtenstein', '2020/2021');
insert into Board (board_id, board_module, board_year) values ('878ef90d', 'Introduction to American Samoa', '2020/2021');

insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('3e645059','faf7c6b9','buffalo row statement pan fellow adjective hurry thread short sure news screen create nearer numeral power her twelve nuts apart control flat street brave love blue trail valley though carried somehow hurried speak fall ruler possibly happened nothing is log shake plastic silence send attack yourself hair careful','why broken herself white given came',95,'ca77860f','12/2/2115','9/24/2077');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('11f3b99f','986fcdbe','exclaimed scene ice game also closer became law damage hold mail hour care give definition spread bent step walk modern mad whole beautiful your tank sense cold picture listen hunt phrase construction grade direction shaking fastened summer chair purpose birds herd safety discover toward folks nature talk truck','thy continued park major joined fireplace',10,'acc45ba4','1/13/2021','10/28/2027');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('ad7e89d1','2f64b1d3','classroom political history gradually exercise log introduced goes brought over art hollow won rabbit worker respect affect difference package greater first pilot be stems explore first these loud waste let recently slave hill war bone plant his care storm bend attached try forest army library manner happened half','seems short because hold directly lot',53,'acc45ba4','9/17/2088','7/5/2073');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('c10c91e8','c18c106c','notice such excitement foreign zoo mission silver pride busy tobacco ability breathing electricity roar barn cannot everybody wheat hospital successful black production been vapor toy blue gave teeth easily ancient which hand please felt glad perhaps writer walk becoming rubber step satellites final giving pipe paid practical discover','division cloth broad tent fruit dangerous',72,'acc45ba4','3/10/2023','5/2/2078');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('9ac2521e','f3a81be9','cow personal attack morning matter catch her could sugar individual will hand baby avoid pressure title city beautiful rate allow excellent stronger race impossible accurate since something due zero enjoy swam blow sell able slave film minute floating milk win coffee answer object in door remove these horse','fairly store stood bottom perfectly pocket',64,'100bad41','11/30/2044','7/31/2047');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('c07a3ae9','8d5b885b','color molecular greatest someone written connected paint lot visit whether kitchen information effect whistle oil cotton exactly consonant avoid larger shells beside coach entirely floating its without final shop can double bring birthday applied dress create corn ourselves never list vessels suddenly stove stepped respect slabs sense us','principle rule no post plates felt',95,'100bad41','11/15/2108','12/23/2030');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('d0e039b3','412fb90d','climate treated alphabet bound many title becoming cool try oldest port own still thank worth being card close western nature make everybody tool including energy learn baseball clothes scientist until mud continued coast war tent powder worry lady breakfast wheel alike wealth ice cotton already nervous kill combine','rule any very daughter hundred equally',95,'966abbd2','12/6/2109','7/24/2111');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('ba5524ac','d4b03b71','growth seeing church angry escape attention why himself doing recent specific movie use needle queen trace threw full business tomorrow lead many bare its especially exactly hall duck finest number some fun add welcome sold against hunt mine floor steel manufacturing tiny truck over grandmother replied careful copy','rhyme went morning frog saw individual',77,'966abbd2','11/12/2079','9/27/2045');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('185c72e6','fa0e9cd4','money your studied government rather nobody certainly club forward under shown breathing planned three girl present social fast tip put slight building faster transportation numeral troops milk satisfied noted sit brave they usually attack garage no floor wind frog purpose fastened identity flies leaf younger how spend symbol','weak peace attention younger work agree',47,'966abbd2','1/10/2040','8/12/2024');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('59a6985c','eb7d1457','library brave paint century slow blanket support continued running try took told valley friendly breeze separate special parts silence shirt shallow moon advice inside poem town lost repeat butter tired explanation swim choice pound please everybody door difficulty degree outer tape another while black apartment send quick needle','scientific harder officer dance picture physical',83,'966abbd2','2/17/2022','9/29/2068');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('ae545ea4','ab6d283c','ability well join earlier along difficulty thin push serious hay now winter product require seven fair depend minute numeral involved various western cost score guard motor read particles knife vote movement look flower feed national fairly rabbit six youth therefore easily bell steel farm barn mostly gasoline shut','average when again title thumb rocket',88,'800447a8','3/18/2054','9/17/2043');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('22ee6f71','20166584','chose route ought principal handsome organization finest statement telephone run bit hang honor getting alike purple front suppose frame improve pink soap frog sister seen about leather chapter globe taken kill egg shoulder become atom change fell shorter stone fur doubt personal making shop symbol start proud brick','major watch forgotten explain region pain',35,'1d0cf14b','9/9/2073','4/17/2032');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('7cbbc2ef','c6fc5e90','instant pack easy led shirt offer customs lack ourselves decide badly keep surprise score finest toward exact come cheese twice no hundred post off missing aloud however border interest process seems thought oxygen hollow principal oil front burst second excitement help region rise electricity sleep public globe feel','dollar lead want older political dug',73,'a91b934a','2/21/2081','9/23/2070');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('82489ca3','7bdea98a','discuss guide doctor strong angry cowboy whether near think speech identity though expression writer known swim back southern cloth please row willing pour cast force lake later perfect morning balloon whether beat trunk coat captain stand plus hair zero rock explore bar support goose flower remarkable locate into','cup pure tone magic wonder former',68,'800447a8','7/21/2076','8/29/2057');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('c2ce837e','d17b519e','soldier second our faster ask freedom gain pipe love forest heart rate include hunter quite leaving compare select stream dish light visitor where fifth within funny avoid cut smallest expression tried ring political gravity surface top dish lungs dug signal captured freedom today too airplane common mysterious late','remain dawn jump opinion teach colony',70,'a91b934a','6/12/2063','11/1/2117');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('47160ce5','d3ff4bac','life stared duty ready prove prevent health garage there body held cry primitive seen largest classroom fire diameter means foot tank depend jump sides rod unit kill fight wear grandfather silk particularly as hunt paint book soft nervous cat goose stone helpful party trade sick ever slabs character','any compass rest fruit smile original',92,'a91b934a','8/23/2081','6/9/2077');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('1f372361','c44651ad','cross stairs find population save experiment hundred prevent occasionally lovely action onto tip south easier enemy policeman location trap palace brought every yellow colony design square seat hungry plural cold been ate sat church needle doing boat rabbit ball eventually breeze worried wild fifty captured piece practice organization','butter doing motor old way buy',48,'ca77860f','12/28/2117','2/10/2051');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('9f7f942a','c0b54120','simple character factor greater folks smaller face able leg idea twice arrow hit fewer move made hungry sit there many earn accept center package pick package gather everything needed center upward element imagine pass mother open foreign alike belt fifth slight piece pile independent lucky under birthday something','eye widely cabin complex where object',77,'6071154c','7/10/2044','5/14/2073');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('de43564b','06c044bb','such reach joy circus learn rose modern creature mail lose thee direct kids climb further previous throughout bound sets famous master obtain underline band test orange sing fly gift evening weigh skill throw smoke for policeman loss collect change connected piano nor raise might tight rod forgot famous','promised religious whatever off open time',58,'6071154c','7/12/2061','8/26/2039');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('1fa31fbf','23ed957c','control television arrow offer completely military waste paragraph worry warn valley invented farther foot add steep vote group hit dear age gulf rubbed remember apartment tide make wait youth complex aboard environment successful person heat element product duck smallest chart hung little fire almost time continent immediately height','cloud nearest fight atomic printed observe',41,'800447a8','11/20/2101','12/31/2107');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('7ef72522','d0c661d9','stock syllable grade older he finger low hour let interest heading lying camera short accident into boy surrounded worker breath crowd string movement sweet tone likely struck disappear section together cat sheet support combination blew soap before loose wagon ring guess fact jar our gun vapor believed country','stage gulf hurt those weight swim',65,'800447a8','12/2/2119','8/10/2094');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('d6804d59','b1467a08','cell strong enemy unit minerals afraid whatever board trip mixture personal name proud steep boat shelf paper railroad fine west particular winter spirit path rocket given plenty prevent father burst cotton surrounded tropical driving tent thick whether reader free distance enter excited lower story middle joy bite canal','arrive blow hand blanket dried happen',34,'6071154c','3/13/2118','4/26/2069');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('d530db01','1b2605cb','chief provide swim pool vowel mood yes able belong beautiful way book out volume chose been cabin suppose swimming win satellites tone all rich satellites fed bright funny fireplace has research gray blow tape none exactly tide gasoline put on bean horse rice party ranch tightly sent afraid','subject necessary guess knew strong climb',40,'6071154c','12/12/2057','5/27/2107');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('fe5b5840','182c9f98','swimming scene phrase moment funny individual pretty cast victory tube name vowel social here active or member seems saddle arrange hat doll naturally help nervous film directly number mind level although log elephant invented gentle track melted wool chemical lips on warn forth review bell medicine disease doctor','jungle stronger theory young hot constantly',57,'bb872b73','4/5/2120','10/2/2107');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('5840715d','5e21a289','guide paint coat begun mysterious section dinner eventually top reader building ten rapidly orbit unusual because independent invented soon gone certain forty avoid money situation everything team person good shall slight position written thing double quickly music wooden forward small stared spring swam story article became origin time','track material include sometime fight shine',66,'bb872b73','6/7/2030','7/16/2080');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('7b561cc8','40afa6de','old fireplace climb duck treated gas thirty morning dropped break community curve funny tube swing dress wonderful start hidden age sheet she give dangerous exchange news count magnet source east position impossible drew chair men home edge length sheet victory explain diameter planning say field trail thrown chemical','wheat correctly once rhyme nearest made',10,'bb872b73','12/5/2104','7/31/2066');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('5c60e972','7e21f3d1','club shut imagine fly sets importance with faster view exchange compound collect choose bone horn giving our every put fix dawn either pie consist dot additional strip exactly silk pure everyone balloon manufacturing slow mouth mood closely foot combination usual tried broad space store declared ability shape easier','brown describe travel receive wire jump',75,'a91b934a','9/17/2091','12/20/2033');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('c15461ef','911d8f65','mouth will paint pack circus regular ill natural market fear tape guess mental probably flow pot themselves condition earlier scientific guard related magic him compare love stared instance cost eye nodded center regular fewer lunch into pure shot proper throw oxygen attempt parts light applied chance horse leader','spite how cabin value element essential',19,'a91b934a','12/31/2030','5/26/2057');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('a20241c7','3e45cf8c','seen title daughter indeed time rose wore east friendly lunch whale cow within paid source father death has rays nuts neighborhood after although grade proud something effort thirty dozen waste high symbol outer solution safety equator press might during married sang weigh whistle nine standard possibly so blow','idea garden spring describe vapor mother',18,'a91b934a','3/27/2031','6/22/2048');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('81e46a20','5f7cae34','college catch story history stock discovery journey official love bend forget settle graph sale dull dirt turn forth easily you sang frequently room remain onto hung broken leg movement newspaper steep citizen bar wall coal range attempt lay clay sharp badly about middle stuck sunlight famous population slabs','line receive brief key disappear pitch',24,'ca77860f','4/28/2082','10/13/2037');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('9b58974a','658f3552','tank wrote today worth age help brave cook dog central rose fur volume plan change passage solid national hospital actually red individual clearly station event negative many forgot travel establish never than driven was table orbit declared separate remarkable tube vegetable put once lunch variety strange space stretch','musical getting joy dropped clay thing',96,'6071154c','1/8/2076','6/28/2027');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('64f5d11d','3b3759c6','beat weigh such electric highway way car unless learn quickly itself establish sell sang string research warm spell plant took could light limited lovely chamber giving suppose news poem customs clearly guide cow flow principle without cold truck porch symbol plant already drive tightly aid manner hall read','doubt mirror add same colony higher',12,'6071154c','9/26/2091','3/3/2029');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('af562368','83a21f26','old couple what flight headed entire wife rod anybody develop important arrive no return capital on breath will experience piece have earlier danger compass afraid simplest chapter simple continued dry coast poetry sit judge answer remain trunk alive noon decide tip himself throughout completely began strange cell laid','exact process hurried moving trail exchange',43,'1d0cf14b','7/18/2053','5/25/2052');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('3eebbb6b','216bfb94','fall pie spell pet farmer year trail highest swung twelve chair tomorrow movement correct strike now human toy main cage compound silly origin spend lovely atmosphere syllable zero beauty diameter frequently phrase soil blue extra result magnet capital refused write order statement probably pack post globe matter cover','nine dried we if rush air',39,'1d0cf14b','12/27/2091','10/16/2079');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('7d64efaa','5cfd880e','human turn young bush poor speech arrive club just gently bottom garage poetry tight write across pen signal art shallow mean can believed crack basket bit train pot gentle furniture slip composition voice western brain bag firm nails both coal place per environment information pool monkey vessels thou','experiment select type neighborhood saw extra',36,'1d0cf14b','4/5/2052','5/16/2083');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('238bea5b','68ec19aa','obtain he matter visitor verb of couple star traffic complex perhaps partly few pole master thin current tomorrow difficulty chicken jet lift former sugar owner become allow throat real shape shot dance four from dawn wrapped period angle voice fellow strip before thick excitement tape process lonely chief','classroom sat total second means additional',48,'6071154c','2/17/2068','4/27/2026');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('59488e2f','22e9a1c7','connected send burn motor lungs help slipped nearly four push either listen letter rush rocket library sea lion journey essential pair grade guide frozen play grow children refused coal to climb jungle scale visitor instant dirt view does tube donkey topic needle natural divide valley sharp oil shells','grain headed frog flow neck dried',31,'6071154c','5/29/2070','3/28/2111');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('179fb261','87be02e2','chain chosen lovely properly hundred composed name closely cost headed at maybe whole thumb valuable boat apart directly telephone engine carbon father car minute waste wave pack my short nest grass character better would thread rising eaten do build station master bent appropriate care troops hold grabbed addition','yourself thank vapor brought either window',36,'bb872b73','6/9/2023','12/15/2117');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('f8e4cf0d','149005fc','funny eleven split likely truth silent goose science solid appropriate week equally stronger pack waste noon information porch but remove everything winter tall does disease remove minute against organized empty crew halfway yard example gone principle pride wing noise affect dead bag balance easy score him pony frozen','furniture was skin voice missing electricity',92,'100bad41','1/24/2035','4/28/2029');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('1db2a933','32ac6854','stiff question bite few heavy close yes fruit bill lot luck law climb sugar badly thumb place appropriate brief me change brain health now enter crack combination apple chief got depend detail occur newspaper mood nest cake palace left spoken income put everyone natural fall stranger earlier noon','leg enemy just limited halfway across',73,'100bad41','2/4/2106','4/14/2108');
insert into Posts (post_id, keyword_id, post_title, post_content, post_likes, user_id, created_date, edited_date) VALUES ('7c367dd6','864cce10','upper unknown house meet mail brick practice hour duck chicken problem give tide poor heavy discussion cool write married expression return can mathematics series garden engine track heavy bottom birds social car evidence beginning labor compass truth quite mountain particular creature balloon hand another refer found having spell','third actually process paint want instead',82,'100bad41','7/6/2075','7/16/2085');

insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('faf7c6b9', 'accident', 'diagram', 'silence', 'long', 'rocky');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('986fcdbe', 'feel', 'difficult', 'went', 'record', 'stems');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('2f64b1d3', 'needle', 'behavior', 'partly', 'interest', 'avoid');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('c18c106c', 'distant', 'slip', 'likely', 'hidden', 'religious');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('f3a81be9', 'cell', 'arrangement', 'however', 'upward', 'accident');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('8d5b885b', 'knew', 'paragraph', 'enjoy', 'happen', 'see');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('412fb90d', 'pick', 'excellent', 'these', 'service', 'yet');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('d4b03b71', 'anyone', 'take', 'popular', 'trick', 'private');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('fa0e9cd4', 'noon', 'all', 'say', 'rush', 'central');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('eb7d1457', 'happen', 'chance', 'bent', 'decide', 'replied');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('ab6d283c', 'shop', 'forgot', 'character', 'however', 'audience');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('20166584', 'detail', 'population', 'lay', 'progress', 'tide');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('c6fc5e90', 'settle', 'joined', 'interest', 'plain', 'first');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('7bdea98a', 'this', 'band', 'lost', 'sure', 'smell');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('d17b519e', 'way', 'largest', 'definition', 'situation', 'proper');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('d3ff4bac', 'before', 'game', 'choice', 'sum', 'tribe');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('c44651ad', 'great', 'white', 'once', 'fall', 'dry');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('c0b54120', 'broke', 'bare', 'society', 'arrow', 'book');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('06c044bb', 'better', 'applied', 'twice', 'printed', 'raise');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('23ed957c', 'softly', 'wrapped', 'process', 'magic', 'nose');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('d0c661d9', 'angle', 'mistake', 'mice', 'cut', 'poetry');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('b1467a08', 'heard', 'late', 'stretch', 'beat', 'path');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('1b2605cb', 'somehow', 'settle', 'fur', 'pond', 'couple');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('182c9f98', 'kitchen', 'according', 'fresh', 'melted', 'opportunity');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('5e21a289', 'did', 'me', 'shinning', 'society', 'felt');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('40afa6de', 'rising', 'dirt', 'wall', 'hospital', 'duty');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('7e21f3d1', 'repeat', 'piece', 'nails', 'burst', 'pick');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('911d8f65', 'scene', 'gently', 'period', 'market', 'wolf');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('3e45cf8c', 'somebody', 'thumb', 'end', 'strength', 'hurry');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('5f7cae34', 'perfect', 'variety', 'although', 'dog', 'among');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('658f3552', 'might', 'taste', 'thrown', 'cattle', 'wealth');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('3b3759c6', 'grandmother', 'daily', 'entire', 'arrangement', 'both');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('83a21f26', 'noted', 'save', 'funny', 'improve', 'climb');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('216bfb94', 'cool', 'variety', 'properly', 'living', 'success');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('5cfd880e', 'stick', 'wealth', 'come', 'production', 'before');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('68ec19aa', 'feed', 'dream', 'bit', 'fast', 'stems');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('22e9a1c7', 'check', 'slipped', 'wash', 'wise', 'enemy');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('87be02e2', 'within', 'system', 'size', 'pretty', 'beautiful');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('149005fc', 'last', 'note', 'beautiful', 'form', 'major');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('32ac6854', 'layers', 'something', 'written', 'fellow', 'saddle');
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('864cce10', 'floor', 'ball', 'maybe', 'picture', 'pay');

insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('a2367eab', 'true', 'true', 'false', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('75b6d7e5', 'false', 'false', 'false', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('100bad41', 'true', 'true', 'true', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('1901eddf', 'true', 'false', 'false', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('f217baa2', 'true', 'true', 'false', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('6071154c', 'false', 'false', 'false', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('03a3f1a2', 'true', 'true', 'false', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('ca77860f', 'true', 'false', 'true', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('966abbd2', 'true', 'false', 'true', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('1d0cf14b', 'false', 'true', 'false', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('df3a26cf', 'true', 'true', 'true', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('bb872b73', 'false', 'true', 'false', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('8aa4a403', 'false', 'true', 'true', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('9aeb1116', 'true', 'true', 'true', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('acc45ba4', 'true', 'false', 'true', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('168bca94', 'false', 'true', 'true', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('aa0f009d', 'false', 'true', 'false', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('82c9aefd', 'false', 'false', 'false', 1);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('a91b934a', 'false', 'true', 'false', 0);
insert into Notifications (user_id, notif_global, notif_new_comment, notif_activity, notif_delete) VALUES ('800447a8', 'false', 'true', 'false', 1);