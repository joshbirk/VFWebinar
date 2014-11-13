currentDiv_body = [];
currentIndicator_body = []

onestarter = function(element, options) {

        this.element = element;
        this.options = options;
        this.loaded = false;

        //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        this.s4 = function() {
              return Math.floor((1 + Math.random()) * 0x10000)
                         .toString(16)
                         .substring(1);
            }
        
        this.guid = function() {
                 return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                 this.s4() + '-' + this.s4() + this.s4() + this.s4();
               }

        onestarter.prototype.carousel = function(element,options) {
                    if(options == null) {
                      options = {
                        position: 'bottom'
                      }
                    }
                    var ele = element;
                    var car_guid = this.guid();

                    ele.addClass(car_guid);
                    ele.data('guid',car_guid);

                    if(options.height) {
                      ele.css('height',options.height);
                    }

                    //create parent div
                    //var dark_header = ele.wrap("<div id='one-body-carousel' class='one-body-divs'></div>");
                    
                    //stye carousel divs
                    ele.children('div').addClass('one-body-content');
                    var pag_ul = '<div style=""><ul class="'+car_guid+' list-horizontal" style="text-align: center; break: all;">';
                    var count = ele.children('div').length;
                    for(var x = 0; x < count; x++) {
                      pag_ul += '<li class="sq-14 lh-14 a-mid js-indicator-body"><a href="javascript:selectCDiv(\''+car_guid+'\','+x+')" class="sq-7 bg-9 brc is_4 js-indicator-body-a" ><span class="tha">-+-</span></a></li>';
                      }
                    pag_ul += '</ul></div>'
                    //create pagination list
                    if(options.position == 'bottom') {
                      ele.before(pag_ul);
                    } else {
                      ele.after(pag_ul);
                    }

                    $("."+car_guid+" .one-body-content").siblings().hide();
                    currentDiv_body[car_guid] = $("."+car_guid+" .one-body-content").siblings().first();
                    currentDiv_body[car_guid].show();
                    
                    $("ul."+car_guid+" a.js-indicator-body-a").removeClass('bg-10');
                    $("ul."+car_guid+" a.js-indicator-body-a").removeClass('ig_2');
                    currentIndicator_body[car_guid] = $("ul."+car_guid+" li.js-indicator-body").siblings().first();
                    currentIndicator_body[car_guid].children(0).addClass('bg-10');
                    currentIndicator_body[car_guid].children(0).addClass('ig-2');
                    currentIndicator_body[car_guid].children(0).removeClass('bg-9');
                    currentIndicator_body[car_guid].children(0).removeClass('is_4');
                    
                    $(":radio").addClass("noSwipe");
                    $(":checkbox").addClass("noSwipe");
                    
                    
                    
                    $(ele).swipe( {
                      allowPageScroll:"vertical",
                      excludedElements: ":radio,:checkbox",
                      swipe:function(event, direction, distance, duration, fingerCount) {
                         var car_guid = $(this).data('guid');
                         console.log(car_guid);
                         if(direction == 'left') {
                            $("."+car_guid+" .one-body-content").siblings().hide();
                            $("ul."+car_guid+" a.js-indicator-body-a").removeClass('bg-10');
                            $("ul."+car_guid+" a.js-indicator-body-a").removeClass('ig_2');
                            $("ul."+car_guid+" a.js-indicator-body-a").addClass('bg-9');
                            $("ul."+car_guid+" a.js-indicator-body-a").addClass('is_4');
                            
                            currentDiv_body[car_guid] = currentDiv_body[car_guid].next();
                            currentIndicator_body[car_guid] = currentIndicator_body[car_guid].next();
                            if(!currentDiv_body[car_guid].hasClass('one-body-content')) { 
                                currentDiv_body[car_guid] = $("."+car_guid+" .one-body-content").siblings().first(); 
                                currentIndicator_body[car_guid] = $("ul."+car_guid+" li.js-indicator-body").siblings().first();
                                }
                            currentDiv_body[car_guid].show();
                            currentIndicator_body[car_guid].children(0).addClass('bg-10');
                            currentIndicator_body[car_guid].children(0).addClass('ig-2');
                            currentIndicator_body[car_guid].children(0).removeClass('bg-9');
                            currentIndicator_body[car_guid].children(0).removeClass('is_4');
                        $.event.trigger({
                          type: 'carousel_change',
                          message: currentDiv_body.attr('id'),
                          time: new Date()
                          });
                         }
                         if(direction == 'right') {
                            $("."+car_guid+" .one-body-content").siblings().hide();
                            $("ul."+car_guid+" a.js-indicator-body-a").removeClass('bg-10');
                            $("ul."+car_guid+" a.js-indicator-body-a").removeClass('ig_2');
                            $("ul."+car_guid+" a.js-indicator-body-a").addClass('bg-9');
                            $("ul."+car_guid+" a.js-indicator-body-a").addClass('is_4');
                            
                            currentDiv_body[car_guid] = currentDiv_body[car_guid].prev();
                            currentIndicator_body[car_guid] = currentIndicator_body[car_guid].prev();
                            if(!currentDiv_body[car_guid].hasClass('one-body-content')) { 
                              currentDiv_body[car_guid] = $("."+car_guid+" .one-body-content").last(); 
                              currentIndicator_body[car_guid] = $("ul."+car_guid+" li.js-indicator-body").siblings().last();
                              }
                            currentDiv_body[car_guid].show();
                            currentIndicator_body[car_guid].children(0).addClass('bg-10');
                            currentIndicator_body[car_guid].children(0).addClass('ig-2');
                            currentIndicator_body[car_guid].children(0).removeClass('bg-9');
                            currentIndicator_body[car_guid].children(0).removeClass('is_4');
                        $.event.trigger({
                          type: 'carousel_change',
                          message: currentDiv_body.attr('id'),
                          time: new Date()
                          });
                          }
                          //    event.preventDefault();
                        },
                        threshold:120,
                        fingers:'all'
                    });
               } 

      onestarter.prototype.close = function() {
                          Sfdc.canvas.publisher.publish({name: "publisher.close",payload:{ refresh:"true" }});
                      }  
      
      onestarter.prototype.enableSubmit = function(callback) {
              if(document.URL.indexOf('apex') < 0) {

                   this.element.append('<button id="dyn_one_submit">Submit</button>');
                   $('#dyn_one_submit').css('position','fixed');
                   $('#dyn_one_submit').css('right','5px');
                   $('#dyn_one_submit').css('top','5px');
                   $('#dyn_one_submit').addClass('btn bg-secondary-btn btn--secondary pvs size-full brm border border--2 text-color-4 f3 fw-semibold');
                   $('#dyn_one_submit').css('height','32px');
                   $('#dyn_one_submit').css('width','75px');
                   
                   $('#dyn_one_submit').click(callback);

              } else { //one.app
                var window_callback = callback;
                window.setTimeout(function() {
                   Sfdc.canvas.publisher.publish({name: "publisher.setValidForSubmit", payload:"true"});
                   Sfdc.canvas.publisher.subscribe({name: "publisher.post", onData:function(e) {
                      window_callback();
                   }});
                  },1000);
              }
             
          
          }

      onestarter.prototype.disableSubmit = function() {
              if(document.URL.indexOf('apex') < 0) {

                   $('#dyn_one_submit').remove();

              } else { //one.app
                  
                  Sfdc.canvas.publisher.publish({name: "publisher.setValidForSubmit", payload:"false"});
                  Sfdc.canvas.publisher.unsubscribe({name: "publisher.post"});

              }
          }

      onestarter.prototype.addError = function(ele) {
          if(ele == null) {
            ele = this.element;
          }
          ele.addClass('input--error');
      }

      onestarter.prototype.removeError = function(ele) {
          if(ele == null) {
            ele = this.element;
          }
          ele.removeClass('input--error');
      }
}



function selectCDiv(guid,index) {
        $("."+guid+" .one-body-content").siblings().hide();
        currentDiv_body[guid] = $("."+guid+" .one-body-content").siblings().eq(index);
        currentDiv_body[guid].show();
        
        $("ul."+guid+" a.js-indicator-body-a").removeClass('bg-10');
        $("ul."+guid+" a.js-indicator-body-a").removeClass('ig_2');
        $("ul."+guid+" a.js-indicator-body-a").addClass('bg-9');
        $("ul."+guid+" a.js-indicator-body-a").addClass('is_4');
                            
        currentIndicator_body[guid] = $("ul."+guid+" li.js-indicator-body").siblings().eq(index);
        currentIndicator_body[guid].children(0).addClass('bg-10');
        currentIndicator_body[guid].children(0).addClass('ig-2');
        currentIndicator_body[guid].children(0).removeClass('bg-9');
        currentIndicator_body[guid].children(0).removeClass('is_4');
    
    }


    