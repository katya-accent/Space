import React from 'react'
import  JourneySelectionForm  from '../JourneySelectionForm/JourneySelectionForm.js'
import { handleSelectionFormSubmit } from '../../handlers.js'


export default function JourneySelectionPage({setState,state}) {
  return (
    <div className="d-flex flex-column w-75 mx-auto justify-content-center w-100"> 
        <JourneySelectionForm setState={setState} state={state} handleSubmit={handleSelectionFormSubmit}></JourneySelectionForm>
    </div>
  )
}
