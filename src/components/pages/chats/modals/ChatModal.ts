import {
  ACTIONS,
  chatUserAction,
  parseChatUserAction,
} from '../../../../constants'
import type { FormActionConfig, FormData } from '../../../ui/form/types'
import type { ChatUser } from '../../../../types/chat'
import type { User } from '../../../../types/user'
import Modal from '../../../ui/modal/Modal'
import type { ModalListItemAction } from './modalData'
import { chatsModalConfig } from './modalsConfig'
import template from './chat-modal.hbs?raw'
import type { ChatModalProps, ModalListItem } from './types'

function buildListAction(
  listItemAction: ModalListItemAction,
  action: string,
): FormActionConfig {
  return { ...listItemAction, action }
}

function mapSearchResultsToListItems(
  results: User[],
  listItemAction: ModalListItemAction,
): ModalListItem[] {
  return results.map((user) => ({
    primaryText: `${user.first_name} ${user.second_name}`,
    secondaryText: `@${user.login}`,
    listAction: buildListAction(listItemAction, chatUserAction('add', user.id)),
  }))
}

function mapUsersToListItems(
  users: ChatUser[],
  listItemAction: ModalListItemAction,
): ModalListItem[] {
  return users.map((user) => ({
    primaryText: user.display_name,
    secondaryText: `@${user.login}`,
    listAction: buildListAction(listItemAction, chatUserAction('remove', user.id)),
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

function buildModalListItems(props: ChatModalProps): ModalListItem[] {
  const config = chatsModalConfig[props.modalKey]

  if (!config.listItemAction) {
    return []
  }

  if (props.modalKey === 'addUser' && props.searchResults) {
    return mapSearchResultsToListItems(props.searchResults, config.listItemAction)
  }

  if (props.modalKey === 'removeUser' && props.users) {
    return mapUsersToListItems(props.users, config.listItemAction)
  }

  return []
}

function buildModalProps(props: ChatModalProps): ChatModalProps {
  const config = chatsModalConfig[props.modalKey]

  return {
    ...props,
    cancelAction: ACTIONS.MODAL_CANCEL,
    closeAction: ACTIONS.MODAL_CLOSE,
    title: config.title,
    hostClass: config.hostClass,
    modalClass: config.modalClass,
    isFormType: config.contentType === 'form',
    isSearchFormType: config.contentType === 'search-form',
    isConfirmType: config.contentType === 'confirm',
    hasListItems: config.contentType === 'search-form' || config.contentType === 'user-list',
    hasFooterActions: config.contentType === 'confirm' || config.contentType === 'user-list',
    message: config.message ?? '',
    emptyListMessage: config.emptyListMessage ?? '',
    fields: config.fields ?? [],
    actions: config.actions ?? [],
    searchActions: config.searchActions ?? [],
    formName: config.formName ?? '',
    onSearchSubmit: buildSearchSubmitHandler(props.onSearch),
    modalListItems: buildModalListItems(props),
  }
}

export default class ChatModal extends Modal<ChatModalProps> {
  static componentName = 'ChatModal'

  protected template = template

  constructor(props: ChatModalProps) {
    super(buildModalProps(props))
  }

  public setProps(props: Partial<ChatModalProps>): void {
    const nextProps = { ...props }

    if (nextProps.searchResults || nextProps.users) {
      nextProps.modalListItems = buildModalListItems({
        ...this.props,
        ...nextProps,
      })
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
      case 'deleteChat':
        this.handleDeleteChatAction(action)
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

  private handleDeleteChatAction(action: string): void {
    if (action === ACTIONS.DELETE_CHAT_CONFIRM) {
      this.props.onDeleteChat?.()
    }
  }

  protected close(): void {
    this.props.onCloseModal?.(this.props.modalKey)
    this.props.onClose?.()
  }
}
