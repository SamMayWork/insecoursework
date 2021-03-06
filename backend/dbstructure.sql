DROP DATABASE forumbackend;
CREATE DATABASE forumbackend;

\c forumbackend

CREATE TABLE IF NOT EXISTS Users (
  user_id varchar(8) PRIMARY KEY,
  user_displayname varchar (100) NOT NULL,
  user_email varchar(100) NOT NULL,
  user_userealname Boolean NOT NULL, 
  user_dateofregistration date NOT NULL
);

CREATE TABLE IF NOT EXISTS Board (
  board_id varchar(8) PRIMARY KEY,
  board_module TEXT NOT NULL,
  board_year varchar(9) NOT NULL
);

CREATE TABLE IF NOT EXISTS Keywords (
  keyword_id varchar(8) PRIMARY KEY,
  keyword_1 varchar(30) NOT NULL,
  keyword_2 varchar(30),
  keyword_3 varchar(30),
  keyword_4 varchar(30),
  keyword_5 varchar(30)
);

CREATE TABLE IF NOT EXISTS Posts (
  post_id varchar (8) PRIMARY KEY,
  keyword_id varchar(8) REFERENCES Keywords(keyword_id),
  board_id varchar(8) NOT NULL REFERENCES Board(board_id),
  post_views smallint NOT NULL,
  post_title varchar (50) NOT NULL,
  post_content TEXT NOT NULL,
  post_likes SMALLINT NOT NULL,
  user_id varchar(8) not null REFERENCES Users(user_id),
  created_date date NOT NULL,
  edited_date date,
  reported Boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS Comments (
  comment_id varchar(8) PRIMARY KEY,
  comment_content TEXT NOT NULL,
  comment_likes SMALLINT NOT NULL,
  comment_views smallint NOT NULL,
  user_id varchar(8) NOT NULL REFERENCES Users(user_id),
  post_id varchar(8) NOT NULL REFERENCES Posts(post_id),
  reply_id varchar(8) REFERENCES Comments(comment_id),
  correct Boolean NOT NULL,
  reported Boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS Notifications (
  user_id varchar (8) NOT NULL REFERENCES Users(user_id),
  notif_global Boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS Quicklinks (
  user_id varchar(8) NOT NULL REFERENCES Users(user_id),
  ql1_label varchar (50),
  ql1_link varchar(200)
);
 
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('a2367eab', 'dish', true, 'sbaldock0@hostgator.com',         '2020-02-07');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('75b6d7e5', 'seed', true, 'jgallelli1@weibo.com',            '2020-02-19');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('100bad41', 'come', true, 'rdellow2@storify.com',            '2020-02-04');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('1901eddf', 'brother', true, 'jdaniellot3@ezinearticles.com',   '2020-02-13');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('f217baa2', 'since',  true, 'sgoford4@mtv.com',                '2020-02-05');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('6071154c', 'carried', false, 'eallso5@ask.com',                 '2020-02-23');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('03a3f1a2', 'anywhere',  true, 'stomlin6@wikia.com',              '2020-02-27');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('ca77860f', 'strange',  true, 'jmusker7@nymag.com',              '2020-02-10');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('966abbd2', 'proper',  true, 'tfirbank8@rediff.com',            '2020-02-20');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('1d0cf14b', 'band', true, 'bfateley9@dion.ne.jp',            '2020-02-20');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('df3a26cf', 'out',  true, 'dlaintona@cbslocal.com',          '2020-02-20');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('bb872b73', 'quickly', true, 'rrosenkrantzb@yale.edu',          '2020-02-26');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('8aa4a403', 'needed',  true, 'mzanassic@discuz.net',            '2020-02-09');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('9aeb1116', 'ruler',  true, 'umoaksond@msu.edu',               '2020-02-12');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('acc45ba4', 'think',  true, 'doverale@wordpress.org',          '2020-02-13');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('168bca94', 'largest',  true, 'osibbef@japanpost.jp',            '2020-02-19');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('aa0f009d', 'sort', true, 'egrattageg@salon.com',            '2020-02-17');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('82c9aefd', 'reason', true, 'glillywhiteh@cnbc.com',           '2020-02-17');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('a91b934a', 'quick', true, 'sducketti@51.la',                 '2020-02-04');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('800447a8', 'film',  true, 'ncotgrovej@dot.gov',              '2020-02-07');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('6080c8a5', 'Sam',  true, 'up891153@myport.ac.uk',              '2020-03-17');
insert into Users (user_id, user_displayname, user_userealname, user_email, user_dateofregistration) values ('00000000', 'Removed',  true, 'removed@removed.ac.uk',              '2020-03-17');

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
insert into Keywords (keyword_id, keyword_1, keyword_2, keyword_3, keyword_4,keyword_5) VALUES ('d3ff4bac', 'check', 'game', 'choice', 'sum', 'tribe');
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

insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('11f3b99f','986fcdbe', 'bf35c787', 0, 'stems till wore stretch','exclaimed scene ice game also closer became law damage hold mail hour care give definition spread bent step walk modern mad whole beautiful your tank sense cold picture listen hunt phrase construction grade direction shaking fastened summer chair purpose birds herd safety discover toward folks nature talk truck',10                                                                                ,'acc45ba4','2020-02-02','2020-02-06', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('ad7e89d1','2f64b1d3', 'cfd5636c', 0, 'drawn tube heat bean','classroom political history gradually exercise log introduced goes brought over art hollow won rabbit worker respect affect difference package greater first pilot be stems explore first these loud waste let recently slave hill war bone plant his care storm bend attached try forest army library manner happened half',53                                                                                ,'acc45ba4','2020-02-21','2020-02-07', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('c10c91e8','c18c106c', '9ebe60da', 0, 'final exactly hit protection','notice such excitement foreign zoo mission silver pride busy tobacco ability breathing electricity roar barn cannot everybody wheat hospital successful black production been vapor toy blue gave teeth easily ancient which hand please felt glad perhaps writer walk becoming rubber step satellites final giving pipe paid practical discover',72                                                   ,'acc45ba4','2020-02-17','2020-02-13', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('3e645059','faf7c6b9', 'ea27b6e3', 0, 'safety clock closer doubt','buffalo row statement pan fellow adjective hurry thread short sure news screen create nearer numeral power her twelve nuts apart control flat street brave love blue trail valley though carried somehow hurried speak fall ruler possibly happened nothing is log shake plastic silence send attack yourself hair careful',95                                                                            ,'ca77860f','2020-02-18','2020-02-02', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('9ac2521e','f3a81be9', 'd7227788', 0, 'knew kept mood instance','cow personal attack morning matter catch her could sugar individual will hand baby avoid pressure title city beautiful rate allow excellent stronger race impossible accurate since something due zero enjoy swam blow sell able slave film minute floating milk win coffee answer object in door remove these horse', 64                                                                                   ,'100bad41','2020-02-08','2020-02-03', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('c07a3ae9','8d5b885b', '43196bcc', 0, 'compound herself most tank','color molecular greatest someone written connected paint lot visit whether kitchen information effect whistle oil cotton exactly consonant avoid larger shells beside coach entirely floating its without final shop can double bring birthday applied dress create corn ourselves never list vessels suddenly stove stepped respect slabs sense us',95                                                  ,'100bad41','2020-02-27','2020-02-17', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('d0e039b3','412fb90d', '330a35aa', 0, 'like as new hello','plastic vast opinion position screenclimate treated alphabet bound many title becoming cool try oldest port own still thank worth being card close western nature make everybody tool including energy learn baseball clothes scientist until mud continued coast war tent powder worry lady breakfast wheel alike wealth ice cotton already nervous kill combine',95                                             ,'966abbd2','2020-02-22','2020-02-28', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('ba5524ac','d4b03b71', '5a6744cd', 0, 'four queen driven new','growth seeing church angry escape attention why himself doing recent specific movie use needle queen trace threw full business tomorrow lead many bare its especially exactly hall duck finest number some fun add welcome sold against hunt mine floor steel manufacturing tiny truck over grandmother replied careful copy',77                                                                              ,'966abbd2','2020-02-03','2020-02-22', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('185c72e6','fa0e9cd4', '8d3842d0', 0, 'receive teach driver animal','money your studied government rather nobody certainly club forward under shown breathing planned three girl present social fast tip put slight building faster transportation numeral troops milk satisfied noted sit brave they usually attack garage no floor wind frog purpose fastened identity flies leaf younger how spend symbol',47                                                             ,'966abbd2','2020-02-26','2020-02-23', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('59a6985c','eb7d1457', '3086f4f2', 0, 'frog plane taxi building', 'community carbon who support landlibrary brave paint century slow blanket support continued running try took told valley friendly breeze separate special parts silence shirt shallow moon advice inside poem town lost repeat butter tired explanation swim choice pound please everybody door difficulty degree outer tape another while black apartment send quick needle',83                          ,'966abbd2','2020-02-07','2020-02-13', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('ae545ea4','ab6d283c', '19591864', 0, 'hunter sheep shinning proud','ability well join earlier along difficulty thin push serious hay now winter product require seven fair depend minute numeral involved various western cost score guard motor read particles knife vote movement look flower feed national fairly rabbit six youth therefore easily bell steel farm barn mostly gasoline shut',88                                                                        ,'800447a8','2020-02-02','2020-02-04', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('22ee6f71','20166584', '0c564d65', 0, 'dull light die wet','chose route ought principal handsome organization finest statement telephone run bit hang honor getting alike purple front suppose frame improve pink soap frog sister seen about leather chapter globe taken kill egg shoulder become atom change fell shorter stone fur doubt personal making shop symbol start proud brick',35                                                                                ,'1d0cf14b','2020-02-16','2020-02-18', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('7cbbc2ef','c6fc5e90', '7c3263e6', 0, 'direct actual roar afternoon','instant pack easy led shirt offer customs lack ourselves decide badly keep surprise score finest toward exact come cheese twice no hundred post off missing aloud however border interest process seems thought oxygen hollow principal oil front burst second excitement help region rise electricity sleep public globe feel',73                                                                     ,'a91b934a','2020-02-01','2020-02-27', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('82489ca3','7bdea98a', '570050ab', 0, 'right wooden sweet day','discuss guide doctor strong angry cowboy whether near think speech identity though expression writer known swim back southern cloth please row willing pour cast force lake later perfect morning balloon whether beat trunk coat captain stand plus hair zero rock explore bar support goose flower remarkable locate into',68                                                                              ,'800447a8','2020-02-16','2020-02-27', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('c2ce837e','d17b519e', '28d0d2db', 0, 'jack sport corn nuts','soldier second our faster ask freedom gain pipe love forest heart rate include hunter quite leaving compare select stream dish light visitor where fifth within funny avoid cut smallest expression tried ring political gravity surface top dish lungs dug signal captured freedom today too airplane common mysterious late',70                                                                              ,'a91b934a','2020-02-17','2020-02-14', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('47160ce5','d3ff4bac', 'ac94085c', 0, 'lady consider egg shoe','life stared duty ready prove prevent health garage there body held cry primitive seen largest classroom fire diameter means foot tank depend jump sides rod unit kill fight wear grandfather silk particularly as hunt paint book soft nervous cat goose stone helpful party trade sick ever slabs character',92                                                                                             ,'a91b934a','2020-02-09','2020-02-11', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('1f372361','c44651ad', '656a53af', 0, 'exist seen snake choice','cross stairs find population save experiment hundred prevent occasionally lovely action onto tip south easier enemy policeman location trap palace brought every yellow colony design square seat hungry plural cold been ate sat church needle doing boat rabbit ball eventually breeze worried wild fifty captured piece practice organization',48                                                        ,'ca77860f','2020-02-24','2020-02-11', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('9f7f942a','c0b54120', '3092f425', 0, 'visitor canal quickly pitch','simple character factor greater folks smaller face able leg idea twice arrow hit fewer move made hungry sit there many earn accept center package pick package gather everything needed center upward element imagine pass mother open foreign alike belt fifth slight piece pile independent lucky under birthday something',77                                                                        ,'6071154c','2020-02-17','2020-02-25', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('de43564b','06c044bb', '3f9b6b51', 0, 'immediately give further four','such reach joy circus learn rose modern creature mail lose thee direct kids climb further previous throughout bound sets famous master obtain underline band test orange sing fly gift evening weigh skill throw smoke for policeman loss collect change connected piano nor raise might tight rod forgot famous',58                                                                                  ,'6071154c','2020-02-16','2020-02-27', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('1fa31fbf','23ed957c', '878ef90d', 0, 'mice slave sense behavior','control television arrow offer completely military waste paragraph worry warn valley invented farther foot add steep vote group hit dear age gulf rubbed remember apartment tide make wait youth complex aboard environment successful person heat element product duck smallest chart hung little fire almost time continent immediately height',41                                                      ,'800447a8','2020-02-12','2020-02-07', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('7ef72522','d0c661d9', 'bf35c787', 0, 'difference thumb column noise','stock syllable grade older he finger low hour let interest heading lying camera short accident into boy surrounded worker breath crowd string movement sweet tone likely struck disappear section together cat sheet support combination blew soap before loose wagon ring guess fact jar our gun vapor believed country',65                                                                          ,'800447a8','2020-02-24','2020-02-24', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('d6804d59','b1467a08', 'cfd5636c', 0, 'shelf end scale interior','cell strong enemy unit minerals afraid whatever board trip mixture personal name proud steep boat shelf paper railroad fine west particular winter spirit path rocket given plenty prevent father burst cotton surrounded tropical driving tent thick whether reader free distance enter excited lower story middle joy bite canal',34                                                                     ,'6071154c','2020-02-05','2020-02-04', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('d530db01','1b2605cb', '9ebe60da', 0, 'separate plastic noise milk','chief provide swim pool vowel mood yes able belong beautiful way book out volume chose been cabin suppose swimming win satellites tone all rich satellites fed bright funny fireplace has research gray blow tape none exactly tide gasoline put on bean horse rice party ranch tightly sent afraid',40                                                                                                 ,'6071154c','2020-02-10','2020-02-08', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('fe5b5840','182c9f98', 'ea27b6e3', 0, 'he of blanket earn','swimming scene phrase moment funny individual pretty cast victory tube name vowel social here active or member seems saddle arrange hat doll naturally help nervous film directly number mind level although log elephant invented gentle track melted wool chemical lips on warn forth review bell medicine disease doctor',57                                                                                  ,'bb872b73','2020-02-06','2020-02-03', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('5840715d','5e21a289', 'd7227788', 0, 'wolf wall impossible indicate','guide paint coat begun mysterious section dinner eventually top reader building ten rapidly orbit unusual because independent invented soon gone certain forty avoid money situation everything team person good shall slight position written thing double quickly music wooden forward small stared spring swam story article became origin time',66                                                ,'bb872b73','2020-02-01','2020-02-27', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('7b561cc8','40afa6de', 'bf35c787', 0, 'throat whose cake saw','old fireplace climb duck treated gas thirty morning dropped break community curve funny tube swing dress wonderful start hidden age sheet she give dangerous exchange news count magnet source east position impossible drew chair men home edge length sheet victory explain diameter planning say field trail thrown chemical',10                                                                           ,'bb872b73','2020-02-04','2020-02-05', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('5c60e972','7e21f3d1', 'cfd5636c', 0, 'past equal something taste','club shut imagine fly sets importance with faster view exchange compound collect choose bone horn giving our every put fix dawn either pie consist dot additional strip exactly silk pure everyone balloon manufacturing slow mouth mood closely foot combination usual tried broad space store declared ability shape easier',75                                                                        ,'a91b934a','2020-02-10','2020-02-23', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('c15461ef','911d8f65', '9ebe60da', 0, 'son about stiff moon','mouth will paint pack circus regular ill natural market fear tape guess mental probably flow pot themselves condition earlier scientific guard related magic him compare love stared instance cost eye nodded center regular fewer lunch into pure shot proper throw oxygen attempt parts light applied chance horse leader',19                                                                                ,'a91b934a','2020-02-21','2020-02-09', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('a20241c7','3e45cf8c', 'ea27b6e3', 0, 'feature sing hurry supper','seen title daughter indeed time rose wore east friendly lunch whale cow within paid source father death has rays nuts neighborhood after although grade proud something effort thirty dozen waste high symbol outer solution safety equator press might during married sang weigh whistle nine standard possibly so blow',18                                                                              ,'a91b934a','2020-02-21','2020-02-02', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('81e46a20','5f7cae34', 'd7227788', 0, 'successful cover noise upward','college catch story history stock discovery journey official love bend forget settle graph sale dull dirt turn forth easily you sang frequently room remain onto hung broken leg movement newspaper steep citizen bar wall coal range attempt lay clay sharp badly about middle stuck sunlight famous population slabs',0                                                                            ,'ca77860f','2020-02-15','2020-02-02', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('9b58974a','658f3552', 'bf35c787', 0, 'paper can owner here','tank wrote today worth age help brave cook dog central rose fur volume plan change passage solid national hospital actually red individual clearly station event negative many forgot travel establish never than driven was table orbit declared separate remarkable tube vegetable put once lunch variety strange space stretch',96                                                                          ,'6071154c','2020-02-11','2020-02-17', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('64f5d11d','3b3759c6', 'cfd5636c', 0, 'lift travel slight fun','beat weigh such electric highway way car unless learn quickly itself establish sell sang string research warm spell plant took could light limited lovely chamber giving suppose news poem customs clearly guide cow flow principle without cold truck porch symbol plant already drive tightly aid manner hall read',12                                                                                     ,'6071154c','2020-02-22','2020-02-28', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('af562368','83a21f26', '9ebe60da', 0, 'plates hour experience adventure','old couple what flight headed entire wife rod anybody develop important arrive no return capital on breath will experience piece have earlier danger compass afraid simplest chapter simple continued dry coast poetry sit judge answer remain trunk alive noon decide tip himself throughout completely began strange cell laid',43                                                               ,'1d0cf14b','2020-02-06','2020-02-28', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('3eebbb6b','216bfb94', 'ea27b6e3', 0, 'dried right is science','fall pie spell pet farmer year trail highest swung twelve chair tomorrow movement correct strike now human toy main cage compound silly origin spend lovely atmosphere syllable zero beauty diameter frequently phrase soil blue extra result magnet capital refused write order statement probably pack post globe matter cover',39                                                                         ,'1d0cf14b','2020-02-22','2020-02-08', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('7d64efaa','5cfd880e', 'd7227788', 0, 'slope caught asleep particular','human turn young bush poor speech arrive club just gently bottom garage poetry tight write across pen signal art shallow mean can believed crack basket bit train pot gentle furniture slip composition voice western brain bag firm nails both coal place per environment information pool monkey vessels thou',36                                                                                  ,'1d0cf14b','2020-02-09','2020-02-12', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('238bea5b','68ec19aa', 'bf35c787', 0, 'conversation thousand expression life','obtain he matter visitor verb of couple star traffic complex perhaps partly few pole master thin current tomorrow difficulty chicken jet lift former sugar owner become allow throat real shape shot dance four from dawn wrapped period angle voice fellow strip before thick excitement tape process lonely chief',48                                                                       ,'6071154c','2020-02-26','2020-02-19', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('59488e2f','22e9a1c7', 'bf35c787', 0, 'account future valley declared','connected send burn motor lungs help slipped nearly four push either listen letter rush rocket library sea lion journey essential pair grade guide frozen play grow children refused coal to climb jungle scale visitor instant dirt view does tube donkey topic needle natural divide valley sharp oil shells',31                                                                                   ,'6071154c','2020-02-16','2020-02-25', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('179fb261','87be02e2', 'cfd5636c', 0, 'feature bread trap fort','chain chosen lovely properly hundred composed name closely cost headed at maybe whole thumb valuable boat apart directly telephone engine carbon father car minute waste wave pack my short nest grass character better would thread rising eaten do build station master bent appropriate care troops hold grabbed addition',36                                                                            ,'bb872b73','2020-02-17','2020-02-09', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('f8e4cf0d','149005fc', '9ebe60da', 0, 'dig get port accurate','funny eleven split likely truth silent goose science solid appropriate week equally stronger pack waste noon information porch but remove everything winter tall does disease remove minute against organized empty crew halfway yard example gone principle pride wing noise affect dead bag balance easy score him pony frozen',92                                                                          ,'100bad41','2020-02-13','2020-02-11', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('1db2a933','32ac6854', 'ea27b6e3', 0, 'exist scientific great attack','stiff question bite few heavy close yes fruit bill lot luck law climb sugar badly thumb place appropriate brief me change brain health now enter crack combination apple chief got depend detail occur newspaper mood nest cake palace left spoken income put everyone natural fall stranger earlier noon',73                                                                                         ,'100bad41','2020-02-28','2020-02-14', 'false');
insert into Posts (post_id, keyword_id, board_id, post_views, post_title, post_content, post_likes, user_id, created_date, edited_date, reported) VALUES ('7c367dd6','864cce10', 'd7227788', 0, 'shop south shells fifth','upper unknown house meet mail brick practice hour duck chicken problem give tide poor heavy discussion cool write married expression return can mathematics series garden engine track heavy bottom birds social car evidence beginning labor compass truth quite mountain particular creature balloon hand another refer found having spell',82                                                            ,'100bad41','2020-02-17','2020-02-15', 'false');

insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('7437e944', 0, 'amount knew just worker pink consist who opportunity prove slept old paragraph aboard paid oil fully related fruit wherever under mysterious recall earn basis', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('1fd4e936', 0, 'little deal that central easily completely bicycle remember badly wheat either exactly just police proud sunlight taste my quickly world daily automobile single smell', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('0d0fd1b5', 0, 'square see store six country clothing character make dance activity excitement silver egg gradually children poet flower increase facing completely open area cannot percent', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('9bff5267', 0, 'bad replace larger dropped experiment smallest south dirty solar worry island cent son free fear income satellites shirt worth beauty poem tide couple porch', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('3f3d9705', 0, 'fear cave view vessels shadow highest species get bread want row single toward cat cake gently sides club constantly secret disappear song buried clothing', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('1acba44f', 0, 'battle try living smallest for thee having hot watch however rain tomorrow vessels ready they exclaimed cool wood noun driver highway globe one unknown', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('52362409', 0, 'tell directly they ear born all cowboy border could atom writing forest obtain cost shout forgot on become smile spend orange word frighten swept', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('4cf2bee4', 0, 'growth winter pen pride acres mice double plural circle position driver shall cast special tip happen age slabs leg oil lesson slip grade plan', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('b0baf6f8', 0, 'sent unhappy sheep real suit comfortable crowd lovely breathing when hit table shoot cattle printed but torn lay seven produce open sold leaving summer', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('8410582e', 0, 'oxygen about poet pond continent band dance question contrast skill screen fifteen key cage golden seldom useful naturally fighting any distance till page knife', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('c1dbe80b', 0, 'equator attack said bank discover dead store rest wood somebody excitement rise bush beat corn per full arrangement milk short raise medicine speech could', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('45594aae', 0, 'continued temperature heart morning author driven itself house myself dozen skin failed exist dirt hall handsome block listen nervous library price were pile location', 0, '100bad41', '11f3b99f', 'false', 'false');
insert into Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('d27324aa', 0, 'write rising whose bare sort dance fruit that jet unless list noon sing law series melted movement shoulder involved clothing public speech indicate type', 0, '100bad41', '11f3b99f', 'false', 'false');
INSERT INTO Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('qd7e89d1', 0, 'Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case.' , 0 , 'a2367eab', '11f3b99f', 'false', 'false');
INSERT INTO Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('q1f3b99f', 0, 'Sight house has sex never. No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case.' , 0 , '75b6d7e5', 'ad7e89d1', 'false', 'false');
INSERT INTO Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('q10c91e8', 0, 'No visited raising gravity outward subject my cottage mr be. Hold do at tore in park feet near my case.' , 0 , '100bad41', 'c10c91e8', 'false', 'false');
INSERT INTO Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('qe645059', 0, 'Hold do at tore in park feet near my case.' , 0 , '1901eddf', '3e645059', 'false', 'false');
INSERT INTO Comments (comment_id, comment_views, comment_content, comment_likes, user_id, post_id, reported, correct) VALUES ('qac2521e', 0, 'feet near my case.' , 0 , 'f217baa2', '9ac2521e', 'false', 'false');


insert into Notifications (user_id, notif_global) VALUES ('a2367eab', 'true');
insert into Notifications (user_id, notif_global) VALUES ('75b6d7e5', 'false');
insert into Notifications (user_id, notif_global) VALUES ('100bad41', 'true');
insert into Notifications (user_id, notif_global) VALUES ('1901eddf', 'true');
insert into Notifications (user_id, notif_global) VALUES ('f217baa2', 'true');
insert into Notifications (user_id, notif_global) VALUES ('6071154c', 'false');
insert into Notifications (user_id, notif_global) VALUES ('03a3f1a2', 'true');
insert into Notifications (user_id, notif_global) VALUES ('ca77860f', 'true');
insert into Notifications (user_id, notif_global) VALUES ('966abbd2', 'true');
insert into Notifications (user_id, notif_global) VALUES ('1d0cf14b', 'false');
insert into Notifications (user_id, notif_global) VALUES ('df3a26cf', 'true');
insert into Notifications (user_id, notif_global) VALUES ('bb872b73', 'false');
insert into Notifications (user_id, notif_global) VALUES ('8aa4a403', 'false');
insert into Notifications (user_id, notif_global) VALUES ('9aeb1116', 'true');
insert into Notifications (user_id, notif_global) VALUES ('acc45ba4', 'true');
insert into Notifications (user_id, notif_global) VALUES ('168bca94', 'false');
insert into Notifications (user_id, notif_global) VALUES ('aa0f009d', 'false');
insert into Notifications (user_id, notif_global) VALUES ('82c9aefd', 'false');
insert into Notifications (user_id, notif_global) VALUES ('a91b934a', 'false');
insert into Notifications (user_id, notif_global) VALUES ('800447a8', 'false');

insert into Quicklinks VALUES ('a2367eab','', '');
insert into Quicklinks VALUES ('75b6d7e5','', '');
insert into Quicklinks VALUES ('100bad41','', '');
insert into Quicklinks VALUES ('1901eddf','', '');
insert into Quicklinks VALUES ('f217baa2','', '');
insert into Quicklinks VALUES ('6071154c','', '');
insert into Quicklinks VALUES ('03a3f1a2','', '');
insert into Quicklinks VALUES ('ca77860f','', '');
insert into Quicklinks VALUES ('966abbd2','', '');
insert into Quicklinks VALUES ('1d0cf14b','', '');
insert into Quicklinks VALUES ('df3a26cf','', '');
insert into Quicklinks VALUES ('bb872b73','', '');
insert into Quicklinks VALUES ('8aa4a403','', '');
insert into Quicklinks VALUES ('9aeb1116','', '');
insert into Quicklinks VALUES ('acc45ba4','', '');
insert into Quicklinks VALUES ('168bca94','', '');
insert into Quicklinks VALUES ('aa0f009d','', '');
insert into Quicklinks VALUES ('82c9aefd','', '');
insert into Quicklinks VALUES ('a91b934a','', '');
insert into Quicklinks VALUES ('800447a8','', '');
insert into Quicklinks VALUES ('6080c8a5','', '');
insert into Quicklinks VALUES ('00000000','', '');