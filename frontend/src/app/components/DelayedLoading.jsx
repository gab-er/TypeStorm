"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'

const DelayedLoading = () => {
    const [showSpinner, setShowSpinner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => 
            setShowSpinner(true), 2000)

        return () => clearTimeout(timer); // clean up on unmount
    }, [])
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            {showSpinner && (
                <div className="flex items-center justify-center mt-55"> 
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
  )
}

export default DelayedLoading