
import React from "react"
import { RecoilPrc } from "./components/RecoilPrc";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {

  return (
    <RecoilRoot>
      <RecoilPrc />
    </RecoilRoot>
  )
}

export default App
