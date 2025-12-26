import {
  defineWebApplication,
  ApplicationSetupOptions,
  Extension,
  AppMenuItemExtension
} from '@opencloud-eu/web-pkg'
import { urlJoin } from '@opencloud-eu/web-client'
import { RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
import { useGettext } from 'vue3-gettext'
import './styles/common.css'

export default defineWebApplication({
  setup(args) {
    const { $gettext } = useGettext()

    const appInfo = {
      id: 'local-llm-opencloud',
      name: $gettext('Local LLM'),
      icon: 'brain',
      color: '#4a5568'
    }

    const routes: RouteRecordRaw[] = [
      {
        path: '/',
        redirect: `/${appInfo.id}/chat`
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('./views/Chat.vue'),
        meta: {
          authContext: 'user',
          title: $gettext('Chat')
        }
      }
    ]

    const extensions = ({ applicationConfig }: ApplicationSetupOptions) => {
      return computed<Extension[]>(() => {
        const menuItems: AppMenuItemExtension[] = [
          {
            // registers a menu item for the app switcher
            id: `app.${appInfo.id}.menuItem`,
            type: 'appMenuItem',
            label: () => appInfo.name,
            color: appInfo.color,
            icon: appInfo.icon,
            path: urlJoin(appInfo.id)
          }
        ]
        return [...menuItems]
      })
    }

    return {
      appInfo,
      routes,
      extensions: extensions(args)
    }
  }
})
