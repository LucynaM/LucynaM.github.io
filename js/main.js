$(function(){
    /*ustalanie szerokości rozwijanego okna menu*/
    function setMenuSize() {
        var menuSize = $("section").width();
	   $("#main-nav-item-list").width(menuSize);
    }
    
    /*layout dla headera gdy okno przeglądarki jest mniejsze niż 480  */
    function setWindowWidth() {
        var windowWidth = $(window).width();
	   if (windowWidth < 480) {
			$(".header-right").removeClass("col-xs-6"); //usuwanie bootstrapowej klasy dzielącej okno na 2
			$(".header-right").eq(1).hide(); //ukrywanie drugiego bloku prawej strony headera
		} else {
			$(".header-right").addClass("col-xs-6");
			$(".header-right").eq(1).show();
		}
    }
    
    /*zmiany wielkosci fontow dla malych bloków headera*/
    function fontHeigthChanges(param1, param2) {
			$(".header-right").find("i").removeClass("fa-"+param1).addClass("fa-"+param2);
			$("#header-right6").removeClass("envelope-"+param1).addClass("envelope-"+param2);
		}
    
    function setColumnSize() {
        var colRWidth = $(".header-right").width(),
            colRHeight = $(".header-right").height();
	
	   if (colRWidth >= 280 && (colRHeight < 200 && colRHeight > 100)) {
			fontHeigthChanges("very-small", "smaller");
		} else if (colRWidth >= 280 && colRHeight < 100) {
			fontHeigthChanges("smaller", "very-small");
		} else if (colRWidth < 280 && (colRHeight < 200 && colRHeight > 100)) {
			fontHeigthChanges("very-small", "smaller");
		} else if (colRWidth < 280 && colRHeight <= 100 ) {
			fontHeigthChanges("smaller", "very-small");
		} else {
			$(".header-right").find("i").removeClass("fa-very-small fa-smaller");
			$("#header-right6").removeClass("envelope-very-small envelope-smaller");
		}
    }
    
    setMenuSize()
    setWindowWidth()
    setColumnSize();
    
    /*zmiany geometrii przy zmianie wielkości okna*/
	$(window).resize(function(){
    	setMenuSize()
        setWindowWidth();
		setColumnSize();
    });

    /*Obsługa menu nawigacyjnego => trójkąt, krzyżyk*/
    $("nav").find("button").click(function(){
        $("#main-nav-item-list").fadeToggle( "slow");	
    });


    /*Obsługa podsekcji portfolio z poziomu linków-kotwic*/
    $("section").find("a[href^='#']").click(function(){
		/*wybór podsekcji zgodnie z kotwicą*/
		var href = $(this).attr("href");
		var thisSectionId = $(href).closest("section").attr("id");
		$("."+thisSectionId+"-portfolio").not(href).fadeOut("slow", function() {
			$(href).fadeIn("slow");	
		});
		
		/*zmiana koloru bieżacego linka*/
		$("#"+thisSectionId).find("a[href^='#']").not(this).removeClass("current");
		$(this).addClass("current");
	});
	
	

    /*Obsługa podsekcji portfolio z poziomu strzałek przewijania*/	
	function checkIndex(sectionId) {
        var result = 0;
		$("."+sectionId+"-portfolio").each(function(index){
			if($("."+sectionId+"-portfolio").eq(index).is("[style$='block;']")){ //sprawdzamy która podsekcja jest aktualnie wyświetlana
				result = index;
			} 
		}) 
        return result;
	}
	
    function changeSectionElement(element, counter) {
        var sectionIndex = 0;
        $(element).click(function(){
            var thisSectionId = $(this).closest("section").attr("id"),
                sectionIndex = checkIndex(thisSectionId),
                sectionLastIndex = $("."+thisSectionId+"-portfolio").length - 1,
                nextIndex = sectionIndex + counter;
            
            if (sectionIndex == sectionLastIndex && counter == 1) {
                nextIndex = 0;
            } 
            if (sectionIndex == 0 && counter == -1) {
                nextIndex = sectionLastIndex;
            } 
            
            $("section#"+thisSectionId).find("a[href^='#']").eq(sectionIndex).removeClass("current"); // z bieżącego linka usuwamy klasę current
            $("section#"+thisSectionId).find("a[href^='#']").eq(nextIndex).addClass("current"); // następnemu linkowi nadajemy klasę current
            $("."+thisSectionId+"-portfolio").eq(sectionIndex).fadeOut("slow"); //ukrywamy bieżącą podsekcję
            $("."+thisSectionId+"-portfolio").eq(nextIndex).fadeIn("slow"); //pokazujemy następną podsekcję
            sectionIndex += counter;  
        });
    }
		
    changeSectionElement(".fa-caret-down", 1);
    changeSectionElement(".fa-caret-up", -1);
    
});