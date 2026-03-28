
import { Html, useGLTF } from '@react-three/drei'
import React, {  useContext, useEffect, useMemo, useRef, useState } from 'react'
import Poster from './Poster';
import { posters } from './Posters';
import { useThree } from '@react-three/fiber';
import { UserContext } from '../context/userContext';
import gsap from 'gsap'
import Sign from './Sign';
import * as THREE from 'three'


const Romani = () => {

    const [text, setText] = useState(false);
    const { camera } = useThree();
const { setInfo, setCameraReturn } = useContext(UserContext);
    
    const bookRef = useRef();
    const textRef = useRef();

   
    const deskModel = useGLTF('./desk.glb');
    const bookModel = useGLTF('./book.glb');
    const tv = useGLTF('./tv.glb');
    const car = useGLTF('./car.glb');

  


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
      x: 64.54,
      y:  12.54,
      z: 21
    });

    gsap.to(camera.position, {
      x: 60,
      z: 18,
      duration: 1,
      delay: 1,
      ease: "circ.inOut"
    });

    
  
    setInfo({
      title: "მხიარული რომანი",
      desc: `  ლევან ხოტივარის 1972 წლის ქართული მხატვრული კომედიური ჟანრის ფილმი. სცენარი ფილმისთვის დაწერეს ოთარ რაზმაძემ, ანზორ სალუქვაძემ და ლევან ხოტივარმა. ფილმის კომპოზიტორია გიორგი ცაბაძე. მთავარ როლებში მონაწილეობენ: იპოლიტე ხვიჩია, ხათუნა კოტრიკაძე და რამაზ გიორგობიანი. ფილმის პრემიერა საქართველოში გაიმართა 1972 წლის 1 სექტემბერს,
       ხოლო მოსკოვში 1974 წლის 2 იანვარს.
       ფილმის სიუჟეტი შემდეგნაირად ვითარდება. დათოს ინკასატორ იპოლიტეს ქალიშვილი ეკა უყვარს. იპოლიტეს ყველგან თავდამსხმელები ელანდება, გაუგებრობის გამო დათოც ავაზაკი ჰგონია, სადაც დაინახავს, მის შეპყრობას და მილიციისთვის გადაცემას ცდილობს. იპოლიტეს წყალობით უსიამოვნებაში არაერთგზის მოხვედრილი დათო და ეკა იპოლიტეს დაუკითხავად დაქორწინდებიან. დათოს სიძედ ხილვა იპოლიტეს წყობიდან გამოიყვანს, 
       მაგრამ მალე ყველაფერი გაირკვევა და ბედნიერი წყვილი საქორწინო მოგზაურობაში გაემგზავრება.
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
    

  return (
   <>
    <group position = {[62, 8.5, 11]}>
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

      
{text && <Html position={[-4, 2.5, 4]} className='text'>
           <h1  style={{ opacity: 0, transform: 'translateY(30px) scale(0.8)' }} ref = {textRef} className='-mt-48  -ml-4 w-48 text-center border-2  border-white bg-purple-300 rounded-md shadow-lg px-2 py-2'>
              ფილმის შესახებ
           </h1>
        </Html>}

      <primitive
        object={tvClone}
        scale = {0.06} rotation = {[0, 2.5, 0]} position = {[-1, 2.2, 2]}
      />

      <Poster  image={posters[2].img}
  position={[11, 4, -13]}
  rotation={[0, -0.4, 0]} />

<primitive object={car.scene} scale = {5} rotation = {[0, 0.6, 0]} position = {[8, -6, 0]} />

<Sign scale = {1.7} position = {[7, -2, -3]} rotation={[0, 0.2, 0]} image = "/romani.png" />
      
      </group>
   </>
  )
}

export default Romani
