
interface IEvent {
  handleConfirm: () => void,
  handleCancel: () => void
}

const useEvent = ({ emit, ctx }: any): IEvent => {
  const handleConfirm = () => {
    emit('confirm', ctx.index)
    emit('update:modelValue', false)
  }

  const handleCancel = () => {
    emit('update:modelValue', false)
  }

  return {
    handleConfirm,
    handleCancel
  }
}

export default useEvent