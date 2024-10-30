'use client'

import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import 'reflect-metadata'

import { ANIMATION_DURATION } from '@/app/shared/config'
import { historySyncPlugin } from '@/app/shared/libs/stackflow/history-sync'
import { basicUIPlugin } from '@/app/shared/libs/stackflow/basic-ui'
import Home from '@/app/views/Home'
import Detail from '@/app/views/Detail'
import AdvBestItems from '@/app/views/AdvBestItems'
import Error from '@/app/views/Error'

export enum ActivityNames {
  Home = 'Home',
  Detail = 'Detail',
  AdvBestItems = 'AdvBestItems',
  Error = 'Error'
}

export enum ActivityRoutes {
  Home = '/',
  Detail = '/detail',
  AdvBestItems = '/adv-best-items',
  Error = '/error'
}

const activities = {
  Home,
  Detail,
  AdvBestItems,
  Error
}

export const routes: { [key in ActivityNames]: ActivityRoutes } = {
  [ActivityNames.Home]: ActivityRoutes[ActivityNames.Home],
  [ActivityNames.Detail]: ActivityRoutes[ActivityNames.Detail],
  [ActivityNames.AdvBestItems]: ActivityRoutes[ActivityNames.AdvBestItems],
  [ActivityNames.Error]: ActivityRoutes[ActivityNames.Error]
}

const getStackflowParams = () => {
  return {
    transitionDuration: ANIMATION_DURATION,
    activities,
    plugins: [
      historySyncPlugin({
        routes,
        fallbackActivity: () => ActivityNames.Home
      }),
      basicRendererPlugin(),
      basicUIPlugin(
        () =>
          ({
            theme: 'cupertino'
          } as never)
      )
    ]
  }
}

export const { Stack, useFlow } = stackflow(getStackflowParams())

export default Stack
