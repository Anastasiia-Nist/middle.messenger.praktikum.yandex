import type { FormActionConfig, FormFieldConfig } from '../../../ui/form/types'
import type { ModalProps } from '../../../ui/modal/types'
import type { ChatUser } from '../../../../types/chat'
import type { User } from '../../../../types/user'
import type { ChatModalKey } from './modalsConfig'

export interface ModalListItem {
  primaryText: string
  secondaryText: string
  listAction: FormActionConfig
}

export interface ChatModalProps extends ModalProps {
  modalKey: ChatModalKey
  hostClass?: string
  isFormType?: boolean
  isSearchFormType?: boolean
  isConfirmType?: boolean
  hasListItems?: boolean
  hasFooterActions?: boolean
  message?: string
  emptyListMessage?: string
  formName?: string
  fields?: FormFieldConfig[]
  actions?: FormActionConfig[]
  searchActions?: FormActionConfig[]
  searchResults?: User[]
  modalListItems?: ModalListItem[]
  users?: ChatUser[]
  onSubmit?: (data: { title: string }) => void
  onSearch?: (login: string) => void
  onSearchSubmit?: (data: Record<string, string | boolean>) => void
  onAddUser?: (userId: number) => void
  onRemoveUser?: (userId: number) => void
  onDeleteChat?: () => void
  onCloseModal?: (modal: ChatModalKey) => void
}
