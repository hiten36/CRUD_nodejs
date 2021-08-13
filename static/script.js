if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
// let b=document.getElementById('search');
// b.addEventListener('input',(e)=>{
//     let query=e.target.value;
//     let b1=document.querySelectorAll('.card');
//     for(i of b1)
//     {
//         if(i.children[0].children[0].innerText.toLowerCase().includes(query.toLowerCase()) || i.children[1].children[0].innerText.toLowerCase().includes(query.toLowerCase()))
//         {
//             i.style.display='block';
//         }
//         else
//         {
//             i.style.display='none';
//         }
//     }
// })
if(document.querySelector('.card')==undefined)
{
    document.getElementById('search-btn').setAttribute("disabled","");
}