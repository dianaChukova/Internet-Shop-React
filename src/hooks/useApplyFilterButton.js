import { useState, useCallback, useRef } from 'react';

const useApplyFilterButton = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const oldFilter = useRef({})
    const [currentFilterState, setCurrentFilterState] = useState({})

    const enableButton = useCallback(() => {
        setIsButtonDisabled(false)
    }, [])

    const disableButton = useCallback(() => {
        setIsButtonDisabled(true)
    }, [])

    const updateCurrentFilter = useCallback((newFilter) => {
        setCurrentFilterState(newFilter)
        const equal = JSON.stringify(newFilter) === JSON.stringify(oldFilter.current)

        if (!equal) {
            enableButton()
        } else {
            disableButton()
        }
    }, [enableButton, disableButton])

    const handleApplyFilter = useCallback(() => {
        oldFilter.current = currentFilterState
        disableButton()
        return currentFilterState
    }, [currentFilterState, disableButton])

    return {
        isButtonDisabled,
        updateCurrentFilter,
        handleApplyFilter,
    }
}

export default useApplyFilterButton;