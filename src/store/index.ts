// src/store/index.ts
import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

interface Comment {
  country: string
  comment: string
  author?: string
  timestamp: Date
}

interface Sport {
  name: string
  gold: number
  silver: number
  bronze: number
  details: string[]
}

interface Country {
  name: string
  gold: number
  silver: number
  bronze: number
  sports: Sport[]
}

export const useOlympicStore = defineStore('olympic', {
  state: () => ({
    medalTable: [
      {
        name: 'United States',
        gold: 39,
        silver: 41,
        bronze: 33,
        sports: [
          {
            name: 'Swimming',
            gold: 11,
            silver: 10,
            bronze: 9,
            details: [
              'Women\'s 1500m Freestyle - Gold (Katie Ledecky)',
              'Men\'s 400m Individual Medley - Gold (Chase Kalisz)',
              'Women\'s 4x100m Freestyle Relay - Gold',
              'Men\'s 4x100m Freestyle Relay - Gold',
              'Women\'s 100m Breaststroke - Silver (Lydia Jacoby)',
              'Men\'s 200m Butterfly - Bronze (Gunnar Bentz)'
            ]
          },
          {
            name: 'Athletics',
            gold: 7,
            silver: 12,
            bronze: 7,
            details: [
              'Women\'s 400m Hurdles - Gold (Sydney McLaughlin, WR)',
              'Men\'s Shot Put - Gold (Ryan Crouser, OR)',
              'Women\'s 4x400m Relay - Gold',
              'Men\'s 200m - Silver (Kenny Bednarek)',
              'Women\'s Long Jump - Bronze (Brittney Reese)'
            ]
          },
          {
            name: 'Basketball',
            gold: 2,
            silver: 0,
            bronze: 0,
            details: [
              'Men\'s Basketball - Gold',
              'Women\'s Basketball - Gold'
            ]
          }
        ]
      },
      {
        name: 'China',
        gold: 38,
        silver: 32,
        bronze: 18,
        sports: [
          {
            name: 'Diving',
            gold: 7,
            silver: 5,
            bronze: 2,
            details: [
              'Women\'s Synchronized 10m Platform - Gold',
              'Men\'s Synchronized 3m Springboard - Gold',
              'Women\'s 10m Platform - Gold (Quan Hongchan)',
              'Men\'s 3m Springboard - Silver',
              'Women\'s 3m Springboard - Bronze'
            ]
          },
          {
            name: 'Weightlifting',
            gold: 7,
            silver: 1,
            bronze: 0,
            details: [
              'Women\'s 55kg - Gold (Liao Qiuyun)',
              'Men\'s 73kg - Gold (Shi Zhiyong)',
              'Women\'s 87kg - Gold (Wang Zhouyu)',
              'Women\'s +87kg - Silver (Li Wenwen)'
            ]
          },
          {
            name: 'Table Tennis',
            gold: 4,
            silver: 3,
            bronze: 0,
            details: [
              'Women\'s Singles - Gold (Chen Meng)',
              'Men\'s Singles - Gold (Ma Long)',
              'Mixed Doubles - Gold',
              'Women\'s Team - Gold'
            ]
          }
        ]
      },
      {
        name: 'Japan',
        gold: 27,
        silver: 14,
        bronze: 17,
        sports: [
          {
            name: 'Judo',
            gold: 9,
            silver: 2,
            bronze: 1,
            details: [
              'Women\'s -48kg - Gold (Uta Abe)',
              'Men\'s -66kg - Gold (Hifumi Abe)',
              'Mixed Team - Gold',
              'Women\'s -70kg - Silver',
              'Men\'s -73kg - Bronze'
            ]
          },
          {
            name: 'Skateboarding',
            gold: 3,
            silver: 1,
            bronze: 1,
            details: [
              'Men\'s Street - Gold (Yuto Horigome)',
              'Women\'s Street - Gold (Momiji Nishiya)',
              'Women\'s Park - Gold (Sakura Yosozumi)',
              'Women\'s Park - Silver (Kokona Hiraki)'
            ]
          }
        ]
      },
      {
        name: 'Great Britain',
        gold: 22,
        silver: 21,
        bronze: 22,
        sports: [
          {
            name: 'Cycling',
            gold: 6,
            silver: 4,
            bronze: 2,
            details: [
              'Men\'s Madison - Gold (Matthew Walls & Ethan Hayter)',
              'Women\'s BMX Freestyle - Gold (Charlotte Worthington)',
              'Men\'s Cross-Country Mountain Biking - Silver',
              'Women\'s Team Pursuit - Bronze'
            ]
          },
          {
            name: 'Swimming',
            gold: 4,
            silver: 3,
            bronze: 1,
            details: [
              'Men\'s 200m Freestyle - Gold (Tom Dean)',
              'Men\'s 4x200m Freestyle Relay - Gold',
              'Mixed 4x100m Medley Relay - Gold',
              'Women\'s 200m Freestyle - Silver (Duncan Scott)'
            ]
          }
        ]
      },
      {
        name: 'ROC',
        gold: 20,
        silver: 28,
        bronze: 23,
        sports: [
          {
            name: 'Gymnastics',
            gold: 2,
            silver: 4,
            bronze: 2,
            details: [
              'Men\'s Team - Gold',
              'Women\'s Team - Silver',
              'Individual All-Around - Gold (Angelina Melnikova)',
              'Floor Exercise - Bronze'
            ]
          }
        ]
      },
      {
        name: 'Australia',
        gold: 17,
        silver: 7,
        bronze: 22,
        sports: [
          {
            name: 'Swimming',
            gold: 9,
            silver: 3,
            bronze: 8,
            details: [
              'Women\'s 4x100m Freestyle Relay - Gold (WR)',
              'Women\'s 100m Freestyle - Gold (Emma McKeon)',
              'Men\'s 200m Breaststroke - Silver'
            ]
          }
        ]
      },
      {
        name: 'Netherlands',
        gold: 10,
        silver: 12,
        bronze: 14,
        sports: [
          {
            name: 'Cycling',
            gold: 4,
            silver: 2,
            bronze: 2,
            details: [
              'Women\'s Road Race - Gold (Annemiek van Vleuten)',
              'Men\'s BMX Racing - Gold',
              'Women\'s BMX Racing - Silver'
            ]
          }
        ]
      },
      {
        name: 'France',
        gold: 10,
        silver: 12,
        bronze: 11,
        sports: [
          {
            name: 'Judo',
            gold: 2,
            silver: 3,
            bronze: 1,
            details: [
              'Women\'s -63kg - Gold (Clarisse Agbegnenou)',
              'Mixed Team - Silver',
              'Men\'s -73kg - Bronze'
            ]
          }
        ]
      },
      {
        name: 'Italy',
        gold: 10,
        silver: 10,
        bronze: 20,
        sports: [
          {
            name: 'Athletics',
            gold: 2,
            silver: 0,
            bronze: 3,
            details: [
              'Men\'s 100m - Gold (Lamont Marcell Jacobs)',
              'Men\'s 4x100m Relay - Gold',
              'Men\'s High Jump - Bronze (Gianmarco Tamberi)'
            ]
          },
          {
            name: 'Cycling',
            gold: 1,
            silver: 3,
            bronze: 2,
            details: [
              'Men\'s Team Pursuit - Gold',
              'Women\'s Road Race - Silver',
              'Men\'s Omnium - Bronze'
            ]
          }
        ]
      },
      {
        name: 'Germany',
        gold: 10,
        silver: 11,
        bronze: 16,
        sports: [
          {
            name: 'Equestrian',
            gold: 3,
            silver: 1,
            bronze: 0,
            details: [
              'Dressage Team - Gold',
              'Individual Dressage - Gold (Jessica von Bredow-Werndl)',
              'Eventing Team - Silver'
            ]
          },
          {
            name: 'Canoeing',
            gold: 2,
            silver: 2,
            bronze: 1,
            details: [
              'Men\'s Canoe Double 1000m - Gold',
              'Women\'s Kayak Four 500m - Gold',
              'Men\'s Kayak Single 1000m - Silver'
            ]
          }
        ]
      },
      {
        name: 'Canada',
        gold: 7,
        silver: 6,
        bronze: 11,
        sports: [
          {
            name: 'Swimming',
            gold: 1,
            silver: 2,
            bronze: 3,
            details: [
              'Women\'s 100m Butterfly - Gold (Margaret MacNeil)',
              'Women\'s 4x100m Freestyle Relay - Silver',
              'Men\'s 100m Butterfly - Bronze'
            ]
          },
          {
            name: 'Athletics',
            gold: 1,
            silver: 1,
            bronze: 1,
            details: [
              'Women\'s 5000m - Gold (Andrea Seccafien)',
              'Men\'s 200m - Silver',
              'Women\'s Pole Vault - Bronze'
            ]
          }
        ]
      },
      {
        name: 'Brazil',
        gold: 7,
        silver: 6,
        bronze: 8,
        sports: [
          {
            name: 'Sailing',
            gold: 2,
            silver: 1,
            bronze: 0,
            details: [
              'Women\'s 49er FX - Gold (Martine Grael/Kahena Kunze)',
              'Men\'s 49er - Gold',
              'Finn - Silver'
            ]
          },
          {
            name: 'Boxing',
            gold: 1,
            silver: 1,
            bronze: 2,
            details: [
              'Men\'s Middleweight - Gold (Hebert Conceição)',
              'Women\'s Lightweight - Silver',
              'Men\'s Light Heavyweight - Bronze'
            ]
          }
        ]
      }
    ] as Country[],
    comments: [] as Comment[],
    savedComments: [] as Comment[]
  }),

  actions: {
    addComment(commentData: Comment) {
      this.comments.push(commentData)
      this.savedComments.push(commentData)
      localStorage.setItem('olympicComments', JSON.stringify(this.savedComments))
    },

    loadSavedComments() {
      const saved = localStorage.getItem('olympicComments')
      if (saved) {
        this.savedComments = JSON.parse(saved)
        this.comments = [...this.savedComments]
      }
    },

    clearComments() {
      this.comments = []
      this.savedComments = []
      localStorage.removeItem('olympicComments')
    }
  }
})

const pinia = createPinia()
export default pinia
