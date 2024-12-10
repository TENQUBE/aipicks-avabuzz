'use client'

import { stackflow, StackflowReactPlugin } from '@stackflow/react'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import 'reflect-metadata'

import { ANIMATION_DURATION } from '@/app/shared/config'
import isIos from '@/app/shared/utils/isIos'
import { historySyncPlugin } from '@/app/shared/libs/stackflow/history-sync'
import { basicUIPlugin } from '@/app/shared/libs/stackflow/basic-ui'
import StackWrapper from '@/app/shared/components/StackWrapper'
import Detail from '@/app/views/Detail'
import AdvBestItems from '@/app/views/AdvBestItems'
import Error from '@/app/views/Error'
import Ad from '@/app/views/Ad'

export enum ActivityNames {
  Detail = 'Detail',
  AdvBestItems = 'AdvBestItems',
  Error = 'Error',
  Ad = 'Ad'
}

export enum ActivityRoutes {
  Detail = '/detail',
  AdvBestItems = '/adv-best-items',
  Error = '/error',
  Ad = '/ad'
}

const activities = {
  Detail,
  AdvBestItems,
  Error,
  Ad
}

export const routes: { [key in ActivityNames]: ActivityRoutes } = {
  [ActivityNames.Detail]: ActivityRoutes[ActivityNames.Detail],
  [ActivityNames.AdvBestItems]: ActivityRoutes[ActivityNames.AdvBestItems],
  [ActivityNames.Error]: ActivityRoutes[ActivityNames.Error],
  [ActivityNames.Ad]: ActivityRoutes[ActivityNames.Ad]
}

const stackWrapperPlugin: StackflowReactPlugin = () => {
  return {
    key: 'stackWrapper',
    wrapStack({ stack }) {
      return StackWrapper({ children: stack.render(), activities: stack.activities })
    }
  }
}

const getStackflowParams = () => {
  return {
    transitionDuration: ANIMATION_DURATION,
    activities,
    plugins: [
      historySyncPlugin({
        routes,
        fallbackActivity: () => ActivityNames.Detail
      }),
      basicRendererPlugin(),
      basicUIPlugin(
        () =>
          ({
            theme: 'cupertino'
          } as never)
      ),
      stackWrapperPlugin
    ]
  }
}

export const { Stack, useFlow: useOriginFlow } = stackflow(getStackflowParams())

export const useFlow = () => {
  const { push: originPush, pop: originPop, replace: originReplace } = useOriginFlow()

  return {
    push: (activityName: ActivityNames, params: {}, options?: { animate?: boolean }) =>
      originPush(activityName, params, { animate: isIos() ? false : options?.animate }),
    pop: (count?: number, options?: { animate?: boolean }) =>
      originPop(count ? count : 1, { animate: isIos() ? false : options?.animate }),
    replace: (activityName: ActivityNames, params: {}, options?: { animate?: boolean }) =>
      originReplace(activityName, params, { animate: isIos() ? false : options?.animate })
  }
}

export default Stack
