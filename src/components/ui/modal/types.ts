import type { BlockOwnProps } from '../../../types/block'

export interface ModalProps extends BlockOwnProps {
  isOpen: boolean
  title: string
  modalClass?: string
  error?: string
  cancelAction?: string
  closeAction?: string
  onClose?: () => void
}
