import {
  ACTIONS,
  chatUserAction,
  parseChatUserAction,
} from '../../../../constants'
import type { FormData } from '../../../ui/form/types'
import type { ChatUser } from '../../../../types/chat'
import type { User } from '../../../../types/user'
import Modal from '../../../ui/modal/Modal'
import { chatsModalConfig } from './modalsConfig'
import template from './chat-modal.hbs?raw'
import type { ChatModalProps } from './types'

type SearchResultItem = User & { addAction: string }

type ChatUserItem = ChatUser & { removeAction: string }

function mapSearchResults(results: User[]): SearchResultItem[] {
  return results.map((user) => ({
    ...user,
    addAction: chatUserAction('add', user.id),
  }))
}

function mapUsers(users: ChatUser[]): ChatUserItem[] {
  return users.map((user) => ({
    ...user,
    removeAction: chatUserAction('remove', user.id),
  }))
}

function buildSearchSubmitHandler(
  onSearch?: (login: string) => void,
): ((data: FormData) => void) | undefined {
  if (!onSearch) {
    return undefined
  }

  return (data: FormData) => {
    const login = String(data.login ?? '').trim()

    if (login) {
      onSearch(login)
    }
  }
}

function buildModalProps(props: ChatModalProps): ChatModalProps {
  const config = chatsModalConfig[props.modalKey]

  const nextProps: ChatModalProps = {
    ...props,
    cancelAction: ACTIONS.MODAL_CANCEL,
    closeAction: ACTIONS.MODAL_CLOSE,
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
    onSearchSubmit: buildSearchSubmitHandler(props.onSearch),
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

    if (nextProps.onSearch !== undefined) {
      nextProps.onSearchSubmit = buildSearchSubmitHandler(nextProps.onSearch)
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
    const userId = parseChatUserAction(action, 'add')

    if (userId !== null) {
      this.props.onAddUser?.(userId)
    }
  }

  private handleRemoveUserAction(action: string): void {
    const userId = parseChatUserAction(action, 'remove')

    if (userId !== null) {
      this.props.onRemoveUser?.(userId)
    }
  }

  protected close(): void {
    this.props.onCloseModal?.(this.props.modalKey)
    this.props.onClose?.()
  }
}
