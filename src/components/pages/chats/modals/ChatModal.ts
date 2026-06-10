import Modal from '../../../ui/modal/Modal'
import type { ChatUser } from '../../../../types/chat'
import type { User } from '../../../../types/user'
import { chatsModalConfig } from './modalsConfig'
import template from './chat-modal.hbs?raw'
import type { ChatModalProps } from './types'

type SearchResultItem = User & { addAction: string }

type ChatUserItem = ChatUser & { removeAction: string }

function mapSearchResults(results: User[]): SearchResultItem[] {
  return results.map((user) => ({
    ...user,
    addAction: `add-user-${user.id}`,
  }))
}

function mapUsers(users: ChatUser[]): ChatUserItem[] {
  return users.map((user) => ({
    ...user,
    removeAction: `remove-user-${user.id}`,
  }))
}

function buildModalProps(props: ChatModalProps): ChatModalProps {
  const config = chatsModalConfig[props.modalKey]

  const nextProps: ChatModalProps = {
    ...props,
    cancelAction: 'modal-cancel',
    title: config.title,
    hostClass: config.hostClass,
    modalClass: config.modalClass,
    isFormType: config.contentType === 'form',
    isSearchFormType: config.contentType === 'search-form',
    isUserListType: config.contentType === 'user-list',
    fields: config.fields ?? [],
    actions: config.actions ?? [],
    searchActions: config.searchActions ?? [],
    formName: config.formName ?? '',
    mappedSearchResults: [],
    mappedUsers: [],
  }

  if (props.modalKey === 'addUser' && props.searchResults) {
    nextProps.mappedSearchResults = mapSearchResults(props.searchResults)
  }

  if (props.modalKey === 'removeUser' && props.users) {
    nextProps.mappedUsers = mapUsers(props.users)
  }

  return nextProps
}

export default class ChatModal extends Modal<ChatModalProps> {
  static componentName = 'ChatModal'

  protected template = template

  constructor(props: ChatModalProps) {
    super(buildModalProps(props))
  }

  public setProps(props: Partial<ChatModalProps>): void {
    const nextProps = { ...props }

    if (nextProps.searchResults) {
      nextProps.mappedSearchResults = mapSearchResults(nextProps.searchResults)
    }

    if (nextProps.users) {
      nextProps.mappedUsers = mapUsers(nextProps.users)
    }

    super.setProps(nextProps)
  }

  protected handleAction(action: string): void {
    switch (this.props.modalKey) {
      case 'addUser':
        this.handleAddUserAction(action)
        break
      case 'removeUser':
        this.handleRemoveUserAction(action)
        break
      default:
        break
    }
  }

  private handleAddUserAction(action: string): void {
    if (action === 'search-user') {
      const loginInput = this.element()?.querySelector<HTMLInputElement>('input[name="login"]')
      const login = loginInput?.value.trim() ?? ''

      if (login) {
        this.props.onSearch?.(login)
      }

      return
    }

    if (action.startsWith('add-user-')) {
      const userId = Number(action.replace('add-user-', ''))

      if (!Number.isNaN(userId)) {
        this.props.onAddUser?.(userId)
      }
    }
  }

  private handleRemoveUserAction(action: string): void {
    if (!action.startsWith('remove-user-')) {
      return
    }

    const userId = Number(action.replace('remove-user-', ''))

    if (!Number.isNaN(userId)) {
      this.props.onRemoveUser?.(userId)
    }
  }
}
