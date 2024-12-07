import { flexRow, justifyCenter } from "./styling/shared.module.css";
import ClassnameJoiner from "./utilities/ClassnameJoiner";

export default function App() {
  return (
    <>
      <div className={ClassnameJoiner.join([flexRow, justifyCenter])}>
        <p>This is a test sentence</p>
      </div>
    </>
  )
}
