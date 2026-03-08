import { Html, useGLTF } from '@react-three/drei';
import React, { useContext, useMemo, useRef, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap'
import Sign from './Sign';
import Poster from './Poster';
import { posters } from './Posters';

const Natvris = () => {

    const [text, setText] = useState(false);
    const { camera } = useThree();
const { setInfo, setCameraReturn } = useContext(UserContext);
    
    const booksRef = useRef();
    const textRef = useRef();

    const deskModel = useGLTF('./desk.glb');
    const bookModel = useGLTF('./book.glb');
    const tv = useGLTF('./tv.glb');

    
    const deskClone = useMemo(() => {
        return deskModel.scene.clone()
    }, [deskModel]);

    const bookClone = useMemo(() => {
        return bookModel.scene.clone()
    }, [bookModel]);
    
    const tvClone = useMemo(() => {
        return tv.scene.clone()
    }, [tv]);

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
          x: 85,
          y:  8,
          z: 40
        });
    
        gsap.to(camera.position, {
          x: 85,
          z: 30,
          duration: 1,
          delay: 1,
          ease: "circ.inOut"
        });
    
        
      
        setInfo({
          title: "ნატვრის ხე",
          desc: `  ფილმი რევოლუციამდელი სოფლის მოზაიკურ პანოს წარმოადგენს, რომელშიც სინამდვილე ორგანულადაა შერწყმული პირობითთან. ამ იდეალისტთა, მეოცნებეთა, ამპარტავანთა და პატივმოყვარეთა სამყაროში მთავარი სიუჟეტური ხაზი მარიტასა და გედიას ტრაგიკული სიყვარულით არის წარმოდგენილი, რომელთაგანაც გადაჯაჭვულია სოციალური წყალგამყოფი ხაზის ორთავე მხარეს მოქცეულ სხვა პერსონაჟთა ბედი. მშვენიერი მარიტა იძულებული გახდება მამის ნებას დაყვეს და შეძლებულ შეთეს მისთხოვდეს, თუმცა მისი გული დიდი ხანია გედიას ეკუთვნის. ქალ-ვაჟი ერთმანეთთან დაცილებას მწარედ განიცდის. მარიტას დედამთილი მიხვდება, რომ რძალს მისი შვილი არ უყვარს და ქმრის ღალატს დასწამებს. ადათის თანახმად, მოღალატე ცოლს საქვეყნოდ დასჯიან. უდანაშაულოდ ისჯება მშვენიერება, ბოროტი სძლევს კეთილს. თუმცა სოფელში მეამბოხეებიც არიან, რომლებიც უზნეობას არასდროს შეურიგდებიან. ადამიანები ლუკმა-პურისათვის წელებზე ფეხს იდგამენ, იტანჯებიან და ოცნებობენ ნათელ მომავალზე, ყველა საკუთარი „ნატვრის თვალს“ დაეძებს,
           სასწაულების ასრულებას შესთხოვს თავის ნატვრის ხეს.
           `
        }
    
        );
      
      }



  return (
    <>
       <group position = {[80, 4, 30]} rotation = {[0, -0.2, 0]}>
      <primitive
        object={deskClone}
        scale={0.1}
        position={[0, 0, 0]}
        rotation={[0, 1, 0]}
      />

<primitive onClick = {showInfo}
        object={bookClone}
        scale = {3.5} rotation = {[0, 1.5, 0]} position = {[-3, 2.9, 4]} onPointerOver = {appearText} onPointerOut = {hideText}  ref = {booksRef}
      />

      
{text && <Html className='text'>
           <h1  style={{ opacity: 0, transform: 'translateY(30px) scale(0.8)' }} ref = {textRef} className='-mt-48  -ml-4 w-48 text-center border-2  border-white bg-purple-300 rounded-md shadow-lg px-2 py-2'>
              ფილმის შესახებ
           </h1>
        </Html>}

      <primitive
        object={tvClone}
        scale = {0.06} rotation = {[0, 2.5, 0]} position = {[-1, 2.2, 2]}
      />

      <Poster  image={posters[3].img}
  position={[11, 4, -13]}
  rotation={[0, -0.4, 0]} />


<Sign scale = {1.7} position = {[7, -2, -3]} rotation={[0, 0.2, 0]} image = "/natvris.jpg" />
      
      </group>
    </>
  )
}

export default Natvris
