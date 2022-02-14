package components

import (
	"fmt"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

// TstructAll tinder api json
type TstructAll struct {
	Meta struct {
		Status int `json:"status"`
	} `json:"meta"`
	Data struct {
		Results []struct {
			TstructResult
		} `json:"results"`
	} `json:"data"`
}

// TstructPhotos Структура фотографий
type TstructPhotos struct {
	ID       string `json:"id"`
	CropInfo struct {
		User struct {
			WidthPct   float64 `json:"width_pct"`
			XOffsetPct float64 `json:"x_offset_pct"`
			HeightPct  float64 `json:"height_pct"`
			YOffsetPct float64 `json:"y_offset_pct"`
		} `json:"user"`
		Algo struct {
			WidthPct   float64 `json:"width_pct"`
			XOffsetPct float64 `json:"x_offset_pct"`
			HeightPct  float64 `json:"height_pct"`
			YOffsetPct float64 `json:"y_offset_pct"`
		} `json:"algo"`
		ProcessedByBullseye bool `json:"processed_by_bullseye"`
		UserCustomized      bool `json:"user_customized"`
	} `json:"crop_info"`
	URL            string           `json:"url"`
	ProcessedFiles []ProcessedFiles `json:"processedFiles"`
	FileName       string           `json:"fileName"`
	Extension      string           `json:"extension"`
}

type ProcessedFiles struct {
	URL    string `json:"url"`
	Height int    `json:"height"`
	Width  int    `json:"width"`
}

// TstructResult Структура результатов
type TstructResult struct {
	Type    string `json:"type"`
	RecType string `json:"rec_type"`
	User    struct {
		ID        string        `json:"_id"`
		Badges    []interface{} `json:"badges"`
		Bio       string        `json:"bio"`
		BirthDate time.Time     `json:"birth_date"`
		Name      string        `json:"name"`
		Photos    []struct {
			TstructPhotos
		} `json:"photos"`
		Gender  int           `json:"gender"`
		Jobs    []interface{} `json:"jobs"`
		Schools []interface{} `json:"schools"`
		City    struct {
			Name string `json:"name"`
		} `json:"city"`
		ShowGenderOnProfile bool `json:"show_gender_on_profile"`
		HideAge             bool `json:"hide_age"`
		HideDistance        bool `json:"hide_distance"`
		RecentlyActive      bool `json:"recently_active"`
	} `json:"user"`
	Instagram struct {
		LastFetchTime         time.Time `json:"last_fetch_time"`
		CompletedInitialFetch bool      `json:"completed_initial_fetch"`
		MediaCount            int       `json:"media_count"`
	} `json:"instagram,omitempty"`
	Facebook struct {
		CommonConnections []interface{} `json:"common_connections"`
		ConnectionCount   int           `json:"connection_count"`
		CommonInterests   []interface{} `json:"common_interests"`
	} `json:"facebook"`
	Spotify struct {
		SpotifyConnected  bool `json:"spotify_connected"`
		SpotifyThemeTrack struct {
			ID    string `json:"id"`
			Name  string `json:"name"`
			Album struct {
				ID     string `json:"id"`
				Name   string `json:"name"`
				Images []struct {
					Height int    `json:"height"`
					Width  int    `json:"width"`
					URL    string `json:"url"`
				} `json:"images"`
			} `json:"album"`
			Artists []struct {
				ID   string `json:"id"`
				Name string `json:"name"`
			} `json:"artists"`
			PreviewURL string `json:"preview_url"`
			URI        string `json:"uri"`
		} `json:"spotify_theme_track"`
	} `json:"spotify"`
	DistanceMi  int    `json:"distance_mi"`
	ContentHash string `json:"content_hash"`
	SNumber     int    `json:"s_number"`
	Teaser      struct {
		String string `json:"string"`
	} `json:"teaser"`
	Teasers        []interface{} `json:"teasers"`
	ExperimentInfo struct {
		UserInterests struct {
			SelectedInterests []struct {
				ID       string `json:"id"`
				Name     string `json:"name"`
				IsCommon bool   `json:"is_common"`
			} `json:"selected_interests"`
		} `json:"user_interests"`
	} `json:"experiment_info,omitempty"`
	IsSuperlikeUpsell bool `json:"is_superlike_upsell"`
}

type ProfileUser struct {
	Meta struct {
		Status int `json:"status"`
	} `json:"meta"`
	Data struct {
		User struct {
			ID           string    `json:"_id"`
			AgeFilterMax int       `json:"age_filter_max"`
			AgeFilterMin int       `json:"age_filter_min"`
			Bio          string    `json:"bio"`
			BirthDate    time.Time `json:"birth_date"`
			CreateDate   time.Time `json:"create_date"`
			CrmID        string    `json:"crm_id"`
			PosInfo      struct {
				Country struct {
					Name   string `json:"name"`
					Cc     string `json:"cc"`
					Alpha3 string `json:"alpha3"`
				} `json:"country"`
				Timezone string `json:"timezone"`
			} `json:"pos_info"`
			Discoverable   bool `json:"discoverable"`
			DistanceFilter int  `json:"distance_filter"`
			GlobalMode     struct {
				IsEnabled           bool   `json:"is_enabled"`
				DisplayLanguage     string `json:"display_language"`
				LanguagePreferences []struct {
					Language   string `json:"language"`
					IsSelected bool   `json:"is_selected"`
				} `json:"language_preferences"`
			} `json:"global_mode"`
			Gender       int    `json:"gender"`
			GenderFilter int    `json:"gender_filter"`
			Name         string `json:"name"`
			Photos       []struct {
				ID       string `json:"id"`
				CropInfo struct {
					User struct {
						WidthPct   int     `json:"width_pct"`
						XOffsetPct int     `json:"x_offset_pct"`
						HeightPct  float64 `json:"height_pct"`
						YOffsetPct float64 `json:"y_offset_pct"`
					} `json:"user"`
					Algo struct {
						WidthPct   float64 `json:"width_pct"`
						XOffsetPct float64 `json:"x_offset_pct"`
						HeightPct  float64 `json:"height_pct"`
						YOffsetPct float64 `json:"y_offset_pct"`
					} `json:"algo"`
					ProcessedByBullseye bool `json:"processed_by_bullseye"`
					UserCustomized      bool `json:"user_customized"`
					FacesCount          int  `json:"faces_count"`
				} `json:"crop_info"`
				URL            string `json:"url"`
				FbID           string `json:"fbId"`
				ProcessedFiles []struct {
					URL    string `json:"url"`
					Height int    `json:"height"`
					Width  int    `json:"width"`
				} `json:"processedFiles"`
			} `json:"photos"`
			PhotosProcessing        bool          `json:"photos_processing"`
			PhotoOptimizerEnabled   bool          `json:"photo_optimizer_enabled"`
			PhotoOptimizerHasResult bool          `json:"photo_optimizer_has_result"`
			PingTime                time.Time     `json:"ping_time"`
			Jobs                    []interface{} `json:"jobs"`
			Schools                 []interface{} `json:"schools"`
			Badges                  []struct {
				Type string `json:"type"`
			} `json:"badges"`
			Username     string `json:"username"`
			PhoneID      string `json:"phone_id"`
			InterestedIn []int  `json:"interested_in"`
			Pos          struct {
				Lat float64 `json:"lat"`
				Lon float64 `json:"lon"`
			} `json:"pos"`
			BillingInfo struct {
				SupportedPaymentMethods []string `json:"supported_payment_methods"`
			} `json:"billing_info"`
			AutoplayVideo        string `json:"autoplay_video"`
			TopPicksDiscoverable bool   `json:"top_picks_discoverable"`
			PhotoTaggingEnabled  bool   `json:"photo_tagging_enabled"`
			City                 struct {
				Name   string `json:"name"`
				Region string `json:"region"`
			} `json:"city"`
			ShowOrientationOnProfile bool `json:"show_orientation_on_profile"`
			ShowSameOrientationFirst struct {
				Checked          bool `json:"checked"`
				ShouldShowOption bool `json:"should_show_option"`
			} `json:"show_same_orientation_first"`
			SexualOrientations []struct {
				ID   string `json:"id"`
				Name string `json:"name"`
			} `json:"sexual_orientations"`
			UserInterests struct {
				SelectedInterests  []interface{} `json:"selected_interests"`
				AvailableInterests []struct {
					ID   string `json:"id"`
					Name string `json:"name"`
				} `json:"available_interests"`
				MinInterests int `json:"min_interests"`
				MaxInterests int `json:"max_interests"`
			} `json:"user_interests"`
			RecommendedSortDiscoverable bool   `json:"recommended_sort_discoverable"`
			SelfieVerification          string `json:"selfie_verification"`
			NoonlightProtected          bool   `json:"noonlight_protected"`
			SyncSwipeEnabled            bool   `json:"sync_swipe_enabled"`
		} `json:"user"`
	} `json:"data"`
}

func CreateDB() {
	pathDB := "./resources/storage.db"
	_, err := os.Create(pathDB)
	checkErr(err)
	db, err := sqlx.Open("sqlite3", pathDB)
	checkErr(err)
	_, _ = db.Exec(`CREATE TABLE sqlite_sequence(name,seq)`)
	_, _ = db.Exec(`CREATE TABLE "preferences" (
		"token"	TEXT UNIQUE,
		"draw_box"	NUMERIC NOT NULL DEFAULT 0,
		"liked_users_count"	INTEGER NOT NULL DEFAULT 0,
		"disliked_users_count"	INTEGER NOT NULL DEFAULT 0
	, "user_pass"	NUMERIC NOT NULL DEFAULT 0)`)
	_, _ = db.Exec(`CREATE TABLE "users" (
		"id"	INTEGER NOT NULL UNIQUE,
		"uid"	TEXT NOT NULL UNIQUE,
		"user_like"	NUMERIC,
		PRIMARY KEY("id" AUTOINCREMENT)
	)`)
	_, _ = db.Exec(`CREATE TABLE "nn_photos" (
		"id"	INTEGER NOT NULL UNIQUE,
		"user_id"	INTEGER NOT NULL,
		"photo_name"	TEXT NOT NULL UNIQUE,
		"valid"	NUMERIC NOT NULL DEFAULT 0,
		FOREIGN KEY("user_id") REFERENCES "users"("id"),
		PRIMARY KEY("id" AUTOINCREMENT)
	)`)
	_, _ = db.Exec(`CREATE TABLE "detected_faces" (
		"id"	INTEGER NOT NULL UNIQUE,
		"photo_id"	INTEGER NOT NULL,
		"x"	INTEGER NOT NULL,
		"y"	INTEGER NOT NULL,
		"width"	INTEGER NOT NULL,
		"height"	INTEGER NOT NULL,
		"nose_x"	INTEGER,
		"nose_y"	INTEGER,
		"left_eye_x"	INTEGER,
		"left_eye_y"	INTEGER,
		"right_eye_x"	INTEGER,
		"right_eye_y"	INTEGER,
		"mouth_left_x"	INTEGER,
		"mouth_left_y"	INTEGER,
		"mouth_right_x"	INTEGER,
		"mouth_right_y"	INTEGER,
		"confidence"	REAL NOT NULL,
		FOREIGN KEY("photo_id") REFERENCES "nn_photos"("id"),
		PRIMARY KEY("id" AUTOINCREMENT)
	)`)
	_, err = db.Exec("INSERT INTO preferences (token, draw_box, liked_users_count, disliked_users_count, user_pass) VALUES ('', 1, 0, 0, 0)")
	checkErr(err)
	db.Close()
	fmt.Println("A new database has been created.")
}

// OpenDB Инициализирует новую или открывает существующую базу данных
func OpenDB() (*sqlx.DB, error) {
	fileName := "./resources/storage.db"
	_, err := os.Stat(fileName)

	if os.IsNotExist(err) {
		CreateDB()
	}
	return sqlx.Open("sqlite3", fileName)
}

// GetTokenFomnDB Возвращает токен из базы данных
func GetTokenFromDB(db *sqlx.DB) string {
	var token string
	checkErr(db.Get(&token, "select token from preferences"))
	return token
}

func GetLikedAndDislikedUsersFromDB(db *sqlx.DB) (int, int) {
	var likedUsers int
	var dislikedUsers int
	checkErr(db.Get(&likedUsers, "select liked_users_count from preferences"))
	checkErr(db.Get(&dislikedUsers, "select disliked_users_count from preferences"))
	return likedUsers, dislikedUsers
}

func GetPassOrIgnoreFromDB(db *sqlx.DB) bool {
	var pass bool
	checkErr(db.Get(&pass, "select user_pass from preferences"))
	return pass
}
