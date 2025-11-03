
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToggle } from '../useToggle'

describe('useToggle', () => {
  // Тест 1: Инициализация с дефолтным значением
  it('should initialize with default value (false)', () => {
    const { result } = renderHook(() => useToggle())
    
    expect(result.current.value).toBe(false)
    expect(typeof result.current.toggle).toBe('function')
    expect(typeof result.current.setTrue).toBe('function')
    expect(typeof result.current.setFalse).toBe('function')
    expect(typeof result.current.setValue).toBe('function')
  })

  // Тест 2: Инициализация с кастомным значением
  it('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useToggle(true))
    
    expect(result.current.value).toBe(true)
  })

  // Тест 3: Функция toggle
  it('should toggle value from false to true', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current.toggle()
    })
    
    expect(result.current.value).toBe(true)
  })

  // Тест 4: Функция toggle обратно
  it('should toggle value from true to false', () => {
    const { result } = renderHook(() => useToggle(true))
    
    act(() => {
      result.current.toggle()
    })
    
    expect(result.current.value).toBe(false)
  })

  // Тест 5: Функция setTrue
  it('should set value to true using setTrue', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current.setTrue()
    })
    
    expect(result.current.value).toBe(true)
  })

  // Тест 6: Функция setFalse
  it('should set value to false using setFalse', () => {
    const { result } = renderHook(() => useToggle(true))
    
    act(() => {
      result.current.setFalse()
    })
    
    expect(result.current.value).toBe(false)
  })

  // Тест 7: Функция setValue с кастомным значением
  it('should set custom value using setValue', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current.setValue(true)
    })
    
    expect(result.current.value).toBe(true)
    
    act(() => {
      result.current.setValue(false)
    })
    
    expect(result.current.value).toBe(false)
  })

  // Тест 8: Множественные вызовы toggle
  it('should handle multiple toggle calls', () => {
    const { result } = renderHook(() => useToggle(false))
    
    act(() => {
      result.current.toggle() // false → true
    })
    expect(result.current.value).toBe(true)
    
    act(() => {
      result.current.toggle() // true → false
    })
    expect(result.current.value).toBe(false)
    
    act(() => {
      result.current.toggle() // false → true
    })
    expect(result.current.value).toBe(true)
  })

  // Тест 9: Комбинация методов
  it('should work correctly with method combinations', () => {
    const { result } = renderHook(() => useToggle(false))
    
    // setTrue → toggle → setFalse → setValue
    act(() => {
      result.current.setTrue()
    })
    expect(result.current.value).toBe(true)
    
    act(() => {
      result.current.toggle()
    })
    expect(result.current.value).toBe(false)
    
    act(() => {
      result.current.setFalse()
    })
    expect(result.current.value).toBe(false)
    
    act(() => {
      result.current.setValue(true)
    })
    expect(result.current.value).toBe(true)
  })
})