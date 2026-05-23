import Avatar from '../components/ui/avatar/Avatar'
import Button from '../components/ui/button/Button'
import ChatMessage from '../components/ui/chat-message/ChatMessage'
import Form from '../components/ui/form/Form'
import Input from '../components/ui/input/Input'
import Link from '../components/ui/link/Link'
import Title from '../components/ui/title/Title'
import ChatSidebar from '../components/pages/chats/sidebar/ChatSidebar'
import SettingsSidebar from '../components/pages/settings/sidebar/SettingsSidebar'
import { registerComponent } from '../helpers/register/registerComponent'

export const registerComponents = (): void => {
  registerComponent(Title)
  registerComponent(Link)
  registerComponent(Button)
  registerComponent(Avatar)
  registerComponent(Input)
  registerComponent(Form)
  registerComponent(ChatMessage)
  registerComponent(ChatSidebar)
  registerComponent(SettingsSidebar)
}
