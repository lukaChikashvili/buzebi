import { Html, useGLTF } from '@react-three/drei'
import React, { useContext, useMemo, useRef, useState } from 'react'
import Poster from './Poster';
import { posters } from './Posters';
import { UserContext } from '../context/userContext';
import GraveStone from './GraveStone';
import gsap from 'gsap'
import { useThree } from '@react-three/fiber';
import Sign from './Sign';
import Box from './Box';

const Sherekilebi = ({ setActiveMovie }) => {

    const [text, setText] = useState(false);
    const { camera } = useThree();
const { setInfo, setCameraReturn, cinemaCamera, setCinemaStart } = useContext(UserContext);
    
    const bookRef = useRef();
    const textRef = useRef();

   
    const deskModel = useGLTF('./desk.glb');
    const bookModel = useGLTF('./book.glb');
    const tv = useGLTF('./tv.glb');
    


    const appearText = () => {
      setText(true);

      requestAnimationFrame(() => {
       gsap.fromTo(
         textRef.current,
         { opacity: 0, y: 30, scale: 0.8 },
         { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
       )
     })
   }

   const hideText = () => {
   
     setText(false);

     gsap.to(textRef.current, {
       opacity: 0,
       y: 30,
       scale: 0.8,
       duration: 0.4,
       ease: 'power2.in',
       
     })
   }
    
   const showInfo = () => {

    setCameraReturn({
      x: -11.97,
      y: 9.51,
      z: -7.37
    });

    gsap.to(camera.position, {
      x:  -17.97,
      y:9.51,
      z: -15.37,
      duration: 1,
      delay: 1,
      ease: "circ.inOut"
    });

    
  
    setInfo({
      title: "შერეკილები",
      desc: `ფანტასტიკური ჟანრის მხატვრული ფილმი, გადაღებული კინოსტუდია „ქართული ფილმის“ მიერ 1973 წელს, რეჟისორია ელდარ შენგელაია. 
      საკავშირო კინოგაქირავებაში გავიდა ერთი წლის შემდეგ. ფილმი გაჯერებულია იუმორითა და სახალისო სცენებით, რომლის ფრაზებიც მაყურებელმა მალევე აიტაცა.
       ფილმის სცენარი ეკუთვნის რეზო გაბრიაძეს, რომელმაც სცენარი გადაამუშავა,
       შეავსო და მოთხრობის სახით გამოსცა 1978 წელს სახელწოდებით „უცხო ჩიტი.“ 
       ერთაოზს, მამის გარდაცვალების შემდეგ, სოფელში აღარაფერი დარჩენია, რადგან რაც კი ებადა მამისეულ ვალებში დაარიგა და ამიტომაც, ახლობლის რჩევით (ისიდორე ბაბუა) 
       ბედის საძიებლად ქალაქში მიდის. შემთხვევით მემანქანე ტრიფონის მეუღლეს, მარგალიტას გაიცნობს, რომელიც ქმრის არყოფნით სარგებლობს და თაყვანისმცემლებს მასპინძლობს. 
       მარგალიტაზე ერთიშეხედვით შეყვარებული ერთაოზი, მას ციხის უფროსის „ცხედრის“ თავიდან მოშორებაში დაეხმარება. „გაცოცხლებული“ ხუტა-უფროსი ერთაოზს ციხეში უკრავს თავს:
       `
    }

    );
  
  }


    const deskClone = useMemo(() => {
        return deskModel.scene.clone()
    }, [deskModel]);

    const bookClone = useMemo(() => {
        return bookModel.scene.clone()
    }, [bookModel]);
    
    const tvClone = useMemo(() => {
        return tv.scene.clone()
    }, [tv]);

    const handleTv = () => {

      setActiveMovie('https://res.cloudinary.com/ddkwnpzev/video/upload/v1772567940/%D0%90%D1%85%D0%B5%D0%B8%D0%B2%D1%8B%D1%81%D1%86%D3%99%D0%B0_-_%E1%83%A8%E1%83%94%E1%83%A0%E1%83%94%E1%83%99%E1%83%98%E1%83%9A%E1%83%94%E1%83%91%E1%83%98_%E1%83%90%E1%83%A4%E1%83%AE%E1%83%90%E1%83%96%E1%83%A3%E1%83%A0%E1%83%90%E1%83%93_online-video-cutter.com_ythpjw.mp4')
      
      cinemaCamera(camera);
     
      
      setTimeout(() => {
        setCinemaStart(true);
      }, 1200);
    }
    

  return (
    <>
      <group position = {[-20, 5, -20]}>
      <primitive
        object={deskClone}
        scale={0.1}
        position={[0, 0, 0]}
        rotation={[0, 1, 0]}
      />

       <primitive onClick = {showInfo}
        object={bookClone}
        scale = {3.5} rotation = {[0, 1.5, 0]} position = {[-3, 2.9, 4]} onPointerOver = {appearText} onPointerOut = {hideText}  ref = {bookRef}
      />

      
{text && <Html className='text'>
           <h1  style={{ opacity: 0, transform: 'translateY(30px) scale(0.8)' }} ref = {textRef} className='-mt-48  -ml-4 w-48 text-center border-2  border-white bg-purple-300 rounded-md shadow-lg px-2 py-2'>
              ფილმის შესახებ
           </h1>
        </Html>}


      <primitive
        object={tvClone}
        scale = {0.06} rotation = {[0, 2.5, 0]} position = {[-1, 2.2, 2]} onClick = {handleTv}
      />

      <Poster  image={posters[1].img}
  position={[11, 4, -13]}
  rotation={[0, -0.4, 0]} />

<GraveStone />
  

<Sign scale = {1.7} position = {[18, -1, 2]} rotation={[0, -1, 0]} image = "/sherekilebi.png" />

<Box rotation = {[0, -2.5, 0]} position = {[1, 2.2, -2]} scale = {0.027} />

      </group>
    
    </>
  )
}

export default Sherekilebi
