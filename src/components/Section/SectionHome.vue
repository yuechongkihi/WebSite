<script setup lang="ts">
import { ref, nextTick, watchEffect, onMounted } from 'vue'
import { avatarLink, socialLinks, githubContributionUser } from '@/config'
import { mottoLength } from '@/language'
import { useI18n } from 'vue-i18n'
import { useTypewriter } from '@/hooks/useTypewriter'
import { isStartViewTransition } from '@/utils/screen'
// @ts-ignore
import GitHubCalendar from 'github-calendar'

const GITHUB_CALENDAR_WIDTH = 690
const TYPEWRITER_PARAGRAPH_INTERVAL = 5000

let mottoIndex = getIndex(mottoLength)

const { t, locale } = useI18n()
const TYPEWRITER_OUTPUT_INTERVAL = locale.value === 'zh' ? 50 : 25

const { text, output: motto, pause } = useTypewriter(t(`mottos[${mottoIndex}]`), {
  interval: TYPEWRITER_OUTPUT_INTERVAL,
  backInterval: TYPEWRITER_OUTPUT_INTERVAL * 0.618,
  callback: () => {
    setTimeout(() => {
      mottoIndex = getIndex(mottoLength, mottoIndex)
      text.value = t(`mottos[${mottoIndex}]`)
    }, TYPEWRITER_PARAGRAPH_INTERVAL)
  }
})

function getIndex(length: number, exclude: number | undefined = undefined) {
  const list = [...Array(length).keys()]

  if (length > 1 && exclude !== undefined) list.splice(exclude, 1)

  return list[Math.floor(Math.random() * list.length)]
}

watchEffect(() => pause(isStartViewTransition.value))

const loading = ref(true)

function setGithubContributionCalendar() {
  if (!githubContributionUser) return

  loading.value = true
  GitHubCalendar('#github-contribution-calendar', githubContributionUser, {
    global_stats: false,
    cache: 'no-cache',
    tooltips: false,
  }).finally(() => {
    loading.value = false

    nextTick(() => {
      const calendarGraphContainer = document.querySelector('.js-calendar-graph > div')

      if (calendarGraphContainer) {
        const toolTipList = Array.from(calendarGraphContainer.querySelectorAll('tool-tip'))
        toolTipList.forEach(item => item.remove())
        toolTipList.splice(0, toolTipList.length)

        const link = document.querySelector('.Link--muted')
        link?.setAttribute('target', '_blank')
      }
    })
  })
}

onMounted(() => {
  setGithubContributionCalendar()
})
</script>

<template>
  <div class="section-home text-type-box">
    <div class="personal-info">
      <a :href="avatarLink || 'javascript: void(0);'" target="_blank">
        <img class="avatar" src="/avatar.png" alt="Avatar" loading="lazy">
      </a>
      <h1 class="name">{{ $t('name') }}</h1>
      <p class="intro">{{ $t('intro') }}</p>
      <p class="motto" :class="locale">{{ motto }}</p>
    </div>
    <div class="social-links">
      <a
        v-for="(link, index) in socialLinks"
        :key="index"
        :href="link.link"
        :title="link.name"
        class="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <component :is="link.icon" class="icon" />
      </a>
    </div>

    <template v-if="githubContributionUser">
      <p class="calendar-title">{{ $t('contributionCalendar') }}</p>
      <div
        class="calendar-container hide-page-cursor"
        ref="githubContributionCalendarContainer"
        :style="{ '--github-calendar-width': GITHUB_CALENDAR_WIDTH + 'px' }"
      >
        <Transition name="fade">
          <div
            v-show="!loading"
            id="github-contribution-calendar"
            class="contribution-calendar"
          ></div>
        </Transition>
        <Transition name="fade">
          <div v-if="loading" class="contribution-calendar loading"></div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.section-home {
  .personal-info {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      width: 100px;
    }

    .name {
      font-size: 28px;
      font-weight: bold;
      margin: 0;
    }

    .intro {
      font-size: 20px;
    }

    .motto {
      font-size: 14px;
      max-width: 80%;
      min-height: 50px;
      text-align: center;

      &.en {
        &::after {
          margin-left: 5px;
        }
      }

      &::after {
        content: '|';
        animation: motto-cursor 1s infinite step-start;
      }
    }
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 10px;

    .link {
      width: 20px;
      height: 20px;
      padding: 4px;
      transition: transform var(--transition-duration);
      
      &:hover {
        transform: scale(1.3);
      }

      .icon {
        text-decoration: none;
        color: var(--foreground-color);
      }
    }
  }

  .calendar-title {
    text-align: center;
    margin-top: 30px;
    font-size: 18px;
  }

  .calendar-container {
    width: calc(100% - 40px);
    min-height: 128px;
    margin: 10px auto 0;
    position: relative;

    .contribution-calendar {
      width: 100%;
      min-height: auto !important;
      margin: 0 auto;

      &.loading {
        width: auto;
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: 8px;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--foreground-color);
          opacity: 0.05;
        }

        &::before {
          content: '';
          position: absolute;
          inset: -20%;
          background-color: var(--foreground-color);
          animation: shark-wrap 2s infinite;
          transform: translateX(-100%);
          mask-image: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 60%,
          );

          .dark & {
            mask-image: linear-gradient(
              45deg,
              transparent 40%,
              rgba(255, 255, 255, 0.075) 50%,
              transparent 60%,
            );
          }
        }
      }
    }
  }
  
  @keyframes motto-cursor {
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes shark-wrap {
    to {
      transform: translateX(100%);
    }
  }
}
</style>
