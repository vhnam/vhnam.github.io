function Gallery(root,time,photos){this.dom=document.getElementById(root);this.photos=photos;this.size=photos.length;this.time=time;this.createGalleryItems=function(){var ul,li,img,p,i;ul=document.createElement('ul');ul.className='gallery';for(i=0;i<this.size;i++){li=document.createElement('li');li.className='gallery__item';li.id=`gallery-${i}`;img=document.createElement('img');img.className='gallery__item-image';img.src=photos[i].src;img.alt=photos[i].title;p=document.createElement('p');p.className='gallery__item-text';p.innerText=photos[i].title;li.appendChild(img);li.appendChild(p);ul.appendChild(li)}
return ul}
this.resetItems=function(){for(var i=0;i<this.size;i++){li=document.getElementById(`gallery-${i}`);if(li)
li.classList.remove('gallery__item--active')}}
this.getPositionForPhoto=function(element){var rangeRotation=30;var position=Math.floor(Math.random()*50)-0;var deg=Math.floor(Math.random()*rangeRotation*2+1)-rangeRotation;deg=`rotate(${deg}deg)`;element.style.webkitTransform=deg;element.style.MozTransform=deg;element.style.msTransform=deg;element.style.OTransform=deg;element.style.transform=deg}
this.run=function(){var i=0,_size=this.size,_time=this.time;funcResetItems=this.resetItems.bind(this);funcGetPositionForPhoto=this.getPositionForPhoto.bind(this);setInterval(function(){if(i===_size){i=0;funcResetItems()}else{li=document.getElementById(`gallery-${i}`);li.classList.add('gallery__item--active');funcGetPositionForPhoto(li)}
i++},_time)}
this.setup=function(){var list=this.createGalleryItems();this.dom.appendChild(list);this.run()}
this.setup()}
