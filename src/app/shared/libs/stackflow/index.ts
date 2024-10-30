'use client'

import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import 'reflect-metadata'

import { ANIMATION_DURATION } from '@/app/shared/config'
import { historySyncPlugin } from '@/app/shared/libs/stackflow/history-sync'
import { basicUIPlugin } from '@/app/shared/libs/stackflow/basic-ui'
import Home from '@/app/views/Home'
import Detail from '@/app/views/Detail'

export enum ActivityNames {
  Home = 'Home',
  Detail = 'Detail'
}

export enum ActivityRoutes {
  Home = '/',
  Detail = '/detail'
}

const activities = {
  Home,
  Detail
}

export const routes: { [key in ActivityNames]: ActivityRoutes } = {
  [ActivityNames.Home]: ActivityRoutes[ActivityNames.Home],
  [ActivityNames.Detail]: ActivityRoutes[ActivityNames.Detail]
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
