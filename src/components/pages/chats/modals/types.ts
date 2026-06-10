import type { FormActionConfig, FormFieldConfig } from '../../../ui/form/types'
import type { ModalProps } from '../../../ui/modal/types'
import type { ChatUser } from '../../../../types/chat'
import type { User } from '../../../../types/user'
import type { ChatModalKey } from './modalsConfig'

export interface ChatModalProps extends ModalProps {
  modalKey: ChatModalKey
  hostClass?: string
  isFormType?: boolean
  isSearchFormType?: boolean
  isUserListType?: boolean
  formName?: string
  fields?: FormFieldConfig[]
  actions?: FormActionConfig[]
  searchActions?: FormActionConfig[]
  searchResults?: User[]
  mappedSearchResults?: Array<User & { addAction: string }>
  users?: ChatUser[]
  mappedUsers?: Array<ChatUser & { removeAction: string }>
  onSubmit?: (data: { title: string }) => void
  onSearch?: (login: string) => void
  onAddUser?: (userId: number) => void
  onRemoveUser?: (userId: number) => void
}
