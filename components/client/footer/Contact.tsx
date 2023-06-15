import React from 'react';
import illustration_ESI from '@/assets/footer_pic_ESI.png'
import illustration_1 from '@/assets/footer_pic_1.png'
import illustration_2 from '@/assets/footer_pic_2.png'


function ContactFooter() {
    return (
        <div className='sm:grid grid-cols-2 my-6'>
                
            <div className='space-y-6 text-left mb-5 sm:mb-0 '>
            <p className='text-sky font-bold text-3xl'>Contactez nous !</p>
            <input type="text" placeholder="Nom et prenom" className="input input-ghost bg-gray-100 shadow-lg shadow-slate-400 w-full md:max-w-md block" />
            <textarea style={{resize: "none"}}  placeholder="Message" className="input input-ghost bg-slate-100 shadow-lg shadow-slate-400 w-full md:max-w-md block min-h-[200px] " />
            <button className="btn bg-sky w-full md:max-w-xs">Envoyer</button>
            </div>

            <div className='w-full text-center sm:text-right'>
            <img src={illustration_1.src} alt="" className=' w-[150px] inline'/>
            <img src={illustration_2.src} alt="" className=' w-[150px] inline'/>
            <img src={illustration_ESI.src} alt="" className='w-[250px] sm:ml-auto mt-4 '/>
            </div>
        </div>
    );
}

export default ContactFooter;