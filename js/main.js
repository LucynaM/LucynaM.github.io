$(function(){
/*ustalanie szerokości rozwijanego okna menu*/
	var menuSize = $("section").width();
	$("#main-nav-item-list").width(menuSize);

/*layout dla headera gdy okno przeglądarki jest mniejsze niż 480  */
	var windowWidth = $(window).width();
	if (windowWidth < 480) {
			$(".header-right").removeClass("col-xs-6"); //usuwanie bootstrapowej klasy dzielącej okno na 2
			$(".header-right").eq(1).hide(); //ukrywanie drugiego bloku prawej strony headera
			$("section#storytelling").find(".col-md-6").eq(0).hide(); 
		} else {
			$(".header-right").addClass("col-xs-6");
			$(".header-right").eq(1).show();
			$("section#storytelling").find(".col-md-6").eq(0).show();
		}
		
/*zmiany wielkosci fontow dla malych bloków headera*/
	function fontHeigthChanges (param1, param2) {
			$(".header-right").find("i").removeClass("fa-"+param1).addClass("fa-"+param2);
			$("#header-right6").removeClass("envelope-"+param1).addClass("envelope-"+param2);
		}
	var colRWidth = $(".header-right").width();
	var colRHeight = $(".header-right").height();
	
	if (colRWidth >= 280 && (colRHeight < 200 && colRHeight > 100)) {
			fontHeigthChanges ("very-small", "smaller");
		} else if (colRWidth >= 280 && colRHeight < 100) {
			fontHeigthChanges ("smaller", "very-small");
		} else if (colRWidth < 280 && (colRHeight < 200 && colRHeight > 100)) {
			fontHeigthChanges ("very-small", "smaller");
		} else if (colRWidth < 280 && colRHeight <= 100 ) {
			fontHeigthChanges ("smaller", "very-small");
		} else {
			$(".header-right").find("i").removeClass("fa-very-small fa-smaller");
			$("#header-right6").removeClass("envelope-very-small envelope-smaller");
		}
	
	$(window).resize(function(){
/*ustalanie szerokości rozwijanego okna menu*/
    	var menuSize = $("section").width();
		$("#main-nav-item-list").width(menuSize);

/*layout dla headera gdy okno przeglądarki jest mniejsze niż 480  */
		var windowWidth = $(window).width();
		if (windowWidth < 480) {
			$(".header-right").removeClass("col-xs-6"); //usuwanie bootstrapowej klasy dzielącej okno na 2
			$(".header-right").eq(1).hide(); //ukrywanie drugiego bloku prawej strony headera
			$("section#storytelling").find(".col-md-6").eq(0).hide(); 
		
		} else {
			$(".header-right").addClass("col-xs-6");
			$(".header-right").eq(1).show();
			$("section#storytelling").find(".col-md-6").eq(0).show();
		}
		
/*zmiany wielkosci fontow dla malych bloków headera*/
		var colRWidth = $(".header-right").width();
		var colRHeight = $(".header-right").height();
		if (colRWidth >= 280 && (colRHeight < 200 && colRHeight > 100)) {
				fontHeigthChanges ("very-small", "smaller");
			} else if (colRWidth >= 280 && colRHeight < 100) {
				fontHeigthChanges ("smaller", "very-small");
			} else if (colRWidth < 280 && (colRHeight < 200 && colRHeight > 100)) {
				fontHeigthChanges ("very-small", "smaller");
			} else if (colRWidth < 280 && colRHeight <= 100 ) {
				fontHeigthChanges ("smaller", "very-small");
			} else {
				$(".header-right").find("i").removeClass("fa-very-small fa-smaller");
				$("#header-right6").removeClass("envelope-very-small envelope-smaller");
			}
		});
	
/*Otwieranie i zamykanie menu nawigacyjnego przez trójkąt*/
	$("button#nav-arrow" ).click(function() {
  		$("#main-nav-item-list").fadeToggle( "slow", function() {
	  	});		
	});
	
/*Zamykanie menu nawigacyjnego przez krzyżyk*/
		$("nav").find("button.close").click(function(){
			$("#main-nav-item-list").fadeOut( "slow", function() {
  			});	
		});


/*Obsługa podsekcji portfolio z poziomu linków-kotwic*/
	
$("section").find("a[href^='#']").click(function(){
		/*wybór podsekcji zgodnie z kotwicą*/
		var href = $(this).attr("href");
		var thisSectionId = $(href).closest("section").attr("id");
		$("."+thisSectionId+"-portfolio").not(href).fadeOut("slow", showingOne);
		function showingOne() {
			$(href).fadeIn("slow");	
		}
		/*zmiana koloru bieżacego linka*/
		$("#"+thisSectionId).find("a[href^='#']").not(this).removeClass("current");
		$(this).addClass("current");
	});
	
	

/*Obsługa podsekcji portfolio z poziomu strzałek przewijania*/	
	var photoIndex = 0;
	var photoLastIndex = $(".photo-portfolio").length - 1;
	
	var graphicsIndex = 0;
	var graphicsLastIndex = $(".graphics-portfolio").length - 1;
	
	var layoutIndex = 0;
	var layoutLastIndex = $(".layout-portfolio").length - 1;
	
	
	function indexChecking (sectionId) {
		$("."+sectionId+"-portfolio").each(function(newIndex){
			if($("."+sectionId+"-portfolio").eq(newIndex).is("[style$='block;']")){ //sprawdzamy która podsekcja jest aktualnie wyświetlana
				
				if (sectionId.indexOf("photo") >= 0) { //nadpisujemy photoIndex
					photoIndex = newIndex;
				} else if (sectionId.indexOf("layout") >= 0) { //nadpisujemy layoutIndex
					layoutIndex = newIndex;
				} else {                               //nadpisujemy graphicsIndex
					graphicsIndex = newIndex;
				}
				
			} else {
				return;
			}
		}) 
	}
	
		
	$(".fa-caret-down").click(function(){
		var thisSectionId = $(this).closest("section").attr("id"); //pobieramy wartość id sekcji
		indexChecking(thisSectionId); // uruchamiamy funkcję sprawdzającą index
		var sectionIndex = eval(thisSectionId+"Index"); //tworzymy tymczasowy index
		var sectionLastIndex = eval(thisSectionId+"LastIndex"); //tworzymy tymczasowy ostatni index
		if (sectionIndex < sectionLastIndex)	{ //jeżeli index jest mniejszy od ostatniego indexu
			console.log("dzialam");
			$("section#"+thisSectionId).find("a[href^='#']").eq(sectionIndex).removeClass("current"); // z bieżącego linka usuwamy klasę current
			$("section#"+thisSectionId).find("a[href^='#']").eq(sectionIndex+1).addClass("current"); // następnemu linkowi nadajemy klasę current
			var current = $("."+thisSectionId+"-portfolio").eq(sectionIndex); //wskazujemy bieżącą podsekcję
			var next = $(current).next(); //wskazujemy następną podsekcję
			$(current).fadeOut("slow");  //bieżącą ukrywamy
			$(next).fadeIn("slow");	 // następną pokazujemy
				if (thisSectionId.indexOf("photo") >= 0) { //nadpisujemy photoIndex
					photoIndex+=1;
				} else if (thisSectionId.indexOf("layout") >= 0) { //nadpisujemy layoutIndex
					layoutIndex+=1;
				} else { //nadpisujemy graphicsIndex
					graphicsIndex+=1;
				}
			
		} else {
			return;
		}
	});
	
	$(".fa-caret-up").click(function(){
		var thisSectionId = $(this).closest("section").attr("id");
		indexChecking(thisSectionId);
		var sectionIndex = eval(thisSectionId+"Index");
		var sectionLastIndex = eval(thisSectionId+"LastIndex");
		if (sectionIndex > 0)	{
			console.log("dzialam");
			$("section#"+thisSectionId).find("a[href^='#']").eq(sectionIndex).removeClass("current");
			$("section#"+thisSectionId).find("a[href^='#']").eq(sectionIndex-1).addClass("current");
			
			var current = $("."+thisSectionId+"-portfolio").eq(sectionIndex);
			var prev = $(current).prev();
			$(current).fadeOut("slow"); 
			$(prev).fadeIn("slow");	
				if (thisSectionId.indexOf("photo") >= 0) {
					photoIndex-=1;
				} else if (thisSectionId.indexOf("layout") >= 0) {
					layoutIndex-=1;
				} else {
					graphicsIndex-=1;
				}
			
		} else {
			return;
		}
	});
});