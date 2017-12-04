/*****************************/
/*   © Д. В. Ткачев, 2016    */
/* nikolaevich1910@gmail.com */
/*****************************/


$('<link/>', {
   rel: 'stylesheet',
   type: 'text/css',
 /*    media: '(min-width: 799px)',*/
   href: 'TestOnSpecialty/css/style.css'
}).appendTo('head');
$('<link/>', {
   rel: 'stylesheet',
 /*  media: '(min-width: 799px)',*/
   type: 'text/css',
   href: 'TestOnSpecialty/css/style_page.css'
   
}).appendTo('head');



var windows;
var OfflineData;
window.onhashchange = Loadhash;
window.onload = Loadhash;
window.onoffline = OnOffline;
window.ononline = OnOnline;
function OnOnline()
{
	if(OfflineData)
	{
		SetData(OfflineData);
		OfflineData = null;
	}
}

function OnOffline()
{
	OfflineData = windows.innerHTML;
	SetData(loading);
	//windows.innerHTML += "Кажется с вашим интернет соединением что-то не то!";
}

function Loadhash()
{
	if(window.location.hash === "#TestOnSpecialty")
	{
		OnClickStart();
		
	}
}

function OnClickStart()
{
	var divhide;
	if (!document.getElementById('test_modal_window_container'))
	{
		$.getScript("http://vk.com/js/api/share.js?90");   
		
		var bodythis = document.getElementsByTagName('body')[0];
		divhide  = document.createElement('div');
		divhide.id   = 'test_modal_window_container'; 
		divhide.style.display = "none";
		
		var close_windows  = document.createElement('img');
		close_windows.id   = 'test_modal_close'; 
		close_windows.src ="TestOnSpecialty/data/img/X.png";
		close_windows.onclick = OnClickModalClose;
		close_windows.innerHTML = "x";
		divhide.appendChild(close_windows);
		
		var hidemessage =  document.createElement('p');
		hidemessage.innerHTML = "БЕГИТЕ ОТСЮДА ГЛУПЦЫ, ЗДЕСЬ ВАС НИЧЕМУ НЕ НАУЧАТ!!!";
		hidemessage.style.visibility = "hidden";
		divhide.appendChild(hidemessage);
		
		
		windows  = document.createElement('div');
		windows.id   = 'test_modal_window'; 
		divhide.appendChild(windows);

		bodythis.appendChild(divhide);
	}
	else
	{
		divhide = document.getElementById('test_modal_window_container');
	}
	divhide.style.display = "inline";
	windows.innerHTML  = "<div class='loading_center'><div class='loading'></div></div>";
	for(var i = 1; i < 31; i = i +1)
	{
		var img = new Image();
        img.src = "TestOnSpecialty/data/img/" + leftPad(i, 2)  +".png"
	}

	LoadDataURT("TestOnSpecialty/php/QuestionsMain.php",null);
}
function LoadDataURT(urls,  msg, isset)
{
	   $.ajax({
                url: urls,
				type: "POST",
                data: msg,
                success: function SetData(data, ev)
				{
					setTimeout(function() { 	windows.innerHTML = data;
					 LoadPage(isset);
					}, 100);
				},
				error: SetDataError
            });
}



function SetDataError(data)
{
  windows.innerHTML = "Ошибка";
}
function OnClickModalClose()
{
	divhide = document.getElementById('test_modal_window_container');
	divhide.style.display = "none";
	history.pushState("", document.title, window.location.pathname);
	return false;
}


function StartTestSet() {

	//console.log(e);
	var $obj =  $("#f_load");
	var msg   = "&EULA=on";
	
	$('#StartTest', $obj).prop('disabled', true);
	$('.loading_center', $obj).css({'visibility':'visible'});
	


		LoadDataURT('TestOnSpecialty/php/QuestionsMain.php',msg)

}


function UserNameSet() {
	var $obj = $("#f_load");
	
	$('#StartTest', $obj).prop('disabled', true);
	$('.loading_center', $obj).css({'visibility':'visible'});
	
	var $userName = $('#UserName',$obj);
	var $er1 = $('.er1',$obj);
    var msg   = $obj.serialize();
	var str = $userName.val();
	if(str.length > 2)
	{
	
		LoadDataURT('TestOnSpecialty/php/QuestionsMain.php',msg);
	}
	else
	{
		$userName.css({'border-color': 'rgba(255,0,4,1.00)' });
		$er1.css({'visibility': 'visible'});

		$('#StartTest', $obj).prop('disabled', false);
		$('.loading_center', $obj).css({'visibility':'hidden'});
	
	}
	
	  
 }
	
function QuestionSet() {
	var $obj = $("#f_load");

	
	$('.StartTest', $obj).attr('disabled', true);
	$('.loading_center', $obj).css({'visibility':'visible'});
	

	if($(this).attr("name") == "ago" || $(this).attr("name") == "forward" || $(this).attr("name")  == "complete")
	{
		LoadDataURT('TestOnSpecialty/php/QuestionsMain.php',"&submit="+ $(this).attr("name"), false);
	
	}
	else
	{
		   var msg   = $obj.serialize();
		LoadDataURT('TestOnSpecialty/php/QuestionsMain.php',msg, true);
	}
	
	
	  
 }
 
function OnClick_icon_response(id)
{
	$('.StartTest').attr('disabled', true);
	$('.loading_center').css({'visibility':'visible'});
	LoadDataURT('TestOnSpecialty/php/QuestionsMain.php?id=' + id,null);
}
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
function LoadPage(setis)
{
	$(".vote").click(QuestionSet);
	$("#set_username").click(UserNameSet);
	$("#set_starttest").click(StartTestSet);
	$("#set_newtest").click(function(){LoadDataURT("TestOnSpecialty/php/QuestionsMain.php",null);});
	$("#share_vk").click(function()
	{
		
		window.open('http://vk.com/share.php?title=Я прошел тест "На скольто ты знаком с информационными технологиями" и набрал '+$(this).attr('count')+ ' баллов!', '_blank');
	});
	if(setis)
	{
		$("#body_page *").css({'animation':'none'}); 
	}
}