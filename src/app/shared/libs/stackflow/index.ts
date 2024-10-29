'use client'

import { stackflow } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import 'reflect-metadata'

import { ANIMATION_DURATION } from '@/app/shared/config'
import { historySyncPlugin } from '@/app/shared/libs/stackflow/history-sync'
import { basicUIPlugin } from '@/app/shared/libs/stackflow/basic-ui'
import Home from '@/app/views/Home'

export enum ActivityNames {
  Home = 'Home'
}

export enum ActivityRoutes {
  Home = '/'
}

const activities = {
  Home
}

export const routes: { [key in ActivityNames]: ActivityRoutes } = {
  [ActivityNames.Home]: ActivityRoutes[ActivityNames.Home]
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
