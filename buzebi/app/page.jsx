"use client"

import { Canvas, useThree } from "@react-three/fiber";
import Experience from "../components/Experience";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "../components/Lights";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Info from "../components/Info";
import mount from '../public/mountImage.jpg'
import gsap from "gsap";
import Menu from "../components/Menu";


export default function Home() {

const { info, showMenu, setShowMenu } = useContext(UserContext);





  

  return (
    <>
     <div className="fixed inset-0 overflow-hidden">
       <div className="absolute top-0 left-0 z-10">
        <p onClick={() => setShowMenu(true)} >Menu</p> 
       </div>

     {info && (
    <div className="absolute inset-0 z-50 pointer-events-auto">
      <Info 
      title="ცისფერი მთები ანუ დაუჯერებელი ამბავი"
      image = {mount}
      desc = "ქართული მხატვრული ფილმი. მისი რეჟისორია ელდარ შენგელაია. გამოვიდა 1984 წელს. ფილმი გადაღებულია რეზო ჭეიშვილის ამავე სახელწოდების მოთხრობის მიხედვით. ახალგაზრდა მწერალს რედაქციაში მოთხრობა მიაქვს. მისი განხილვის მოლოდინში გადის შემოდგომა, ზამთარი, გაზაფხული… მოთხრობას არათუ არავინ კითხულობს, მისი ყველა არსებული ეგზემპლარიც უკვალოდ ქრება. ამ დაწესებულებაში ყველა თავისი საქმით არის გართული: დირექტორი მუდამ გადარბენაზეა — თათბირიდან ბანკში, ბანკიდან შეხვედრაზე, შეხვედრიდან ბანკეტზე და ასე დაუსრულებლად, რედაქტორებიდან ზოგი ფრანგულს სწავლობს, ზოგი კერავს, ზოგი საუზმეს იმზადებს, ვიღაც შვებულებაშია, ვიღაც — მივლინებაში, სხვები ჭადრაკს თამაშობენ… ერთადერთი ადამიანი, ვინც ხელნაწერებს კითხულობს, მღებავია… ფილმი ალეგორიული კომედიაა. იგი ნიღაბს ხდის საბჭოთა ბიუროკრატიზმს და უპასუხისმგებლობას. რედაქციაში მუშაობენ თავიანთი ვიწრო, ობივატელური ინტერესების ჩარჩოში მომწყვდეული ადამიანები; ამ სისტემის არაეფექტურობა სრულდება პირდაპირ მნიშვნელობით დაწესებულების ნგრევით, გადატანით კი — საბჭოთა სისტემის ნგრევით." />

    </div>
  )}


      <Canvas  camera={{ position: [
2.74, 
12.12, 
24.025], fov: 70, near: 0.1, far: 10000 }}
        shadows
        gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }} onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1)
        }}>
        
        <Physics>
       <Menu isOpen={showMenu} />

       <Experience />
       </Physics>
       <Lights />
      </Canvas>




  </div>
    </>
  );
}
