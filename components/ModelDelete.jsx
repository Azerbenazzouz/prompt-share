"use client"

const ModelDelete = ({open , onClose , children}) => {

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
            onClick={onClose}
        >
            <div 
                className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                onClick={(e)=>e.stopPropagation()}    
            >
                    <button 
                        type="button" 
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    {children}
            </div>
        </div>
    )
}

export default ModelDelete
