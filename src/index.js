import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ModalProvider} from './modalContext'
import {RenderProvider} from './context'



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <RenderProvider>
    <ModalProvider>
		<App />
    </ModalProvider>
    </RenderProvider>
	</React.StrictMode>
)